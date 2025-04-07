import { Injectable, Logger, Scope } from '@nestjs/common';

// TRANSIENT: 주입될 때마다 새로운 인스턴스 생성 - 각 서비스/컴포넌트가 독립적인 로거 설정(컨텍스트, 메시지 형식, 로깅 동작 등)을 가질 수 있게 해줌
@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService extends Logger {
  setContext(context: string): void {
    this.context = context;
  }

  logHttpRequest(
    method: string,
    url: string,
    statusCode: number,
    contentLength: string,
    responseTime: number,
  ): void {
    const message = `${method} ${url} ${statusCode} ${contentLength} - ${responseTime}ms`;
    this.log(message, 'HttpRequest');
  }

  logDatabase(operation: string, table: string, details?: any): void {
    const message = `${operation} ${table} ${details ? JSON.stringify(details) : ''}`;
    this.log(message, 'Database');
  }

  logBusiness(action: string, result: string, metadata?: any): void {
    const message = `${action} - ${result} ${metadata ? JSON.stringify(metadata) : ''}`;
    this.log(message, 'Business');
  }

  logError(message: string, trace: string, context?: string): void {
    super.error(message, trace, context);
  }
}
