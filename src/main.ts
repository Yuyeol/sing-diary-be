import { NestFactory } from '@nestjs/core';
import { AppModule } from '@app/app.module';
import { envConfig } from '@config/env.config';
import { HttpInterceptor } from '@common/logger/interceptors/http.interceptor';
import { LoggerService } from '@common/logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const loggerService = await app.resolve(LoggerService);
  app.useGlobalInterceptors(new HttpInterceptor(loggerService));

  await app.listen(envConfig.port, '0.0.0.0');
}
bootstrap();
