import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { KySongsModule } from '@modules/ky-songs/ky-songs.module';
import { LoggerModule } from '@common/logger/logger.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LoggerModule,
    KySongsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
