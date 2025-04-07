import { Module } from '@nestjs/common';
import { LoggerService } from '@common/logger/logger.service';
import { HttpInterceptor } from '@common/logger/interceptors/http.interceptor';

@Module({
  providers: [LoggerService, HttpInterceptor],
  exports: [LoggerService, HttpInterceptor],
})
export class LoggerModule {}
