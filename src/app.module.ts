import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AllSongsModule } from '@modules/all-songs/all-songs.module';
import { PopularSongsModule } from '@modules/popular-songs/popular-songs.module';
import { LoggerModule } from '@common/logger/logger.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LoggerModule,
    AllSongsModule,
    PopularSongsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
