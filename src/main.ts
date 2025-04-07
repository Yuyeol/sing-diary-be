import { NestFactory } from '@nestjs/core';
import { AppModule } from '@app/app.module';
import { envConfig } from '@config/env.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 일단 모든 cors 허용
  app.enableCors();
  await app.listen(envConfig.port);
}
bootstrap();
