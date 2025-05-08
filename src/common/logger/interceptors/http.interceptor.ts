import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoggerService } from '@common/logger/logger.service';

@Injectable()
export class HttpInterceptor implements NestInterceptor {
  constructor(private readonly logger: LoggerService) {
    // 로깅 시 맨 앞에 붙는 네임스페이스. 태그같은것
    // 인터셉터 인스턴스 생성시 초기 기본값으로 설정됨
    this.logger.setContext('HTTP');
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const { method, url, ip } = req;
    const userAgent = req.get('user-agent') || '';
    const now = Date.now();
    this.logger.log(
      `Incoming Request: ${method} ${url} - ${ip} - ${userAgent}`,
      'Request',
    );

    return next.handle().pipe(
      // tap: 로깅을 위한 오퍼레이터. map, filter같은 오퍼레이터도 있음.
      tap({
        next: (data) => {
          const res = context.switchToHttp().getResponse();
          const responseTime = Date.now() - now;
          const contentLength = data?.length || '-';

          this.logger.logHttpRequest(
            method,
            url,
            res.statusCode,
            contentLength.toString(),
            responseTime,
          );
        },
        error: (error) => {
          const responseTime = Date.now() - now;

          this.logger.error(
            `Error on ${method} ${url} - ${responseTime}ms: ${error.message}`,
            error.stack,
          );
        },
      }),
    );
  }
}
