import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { KySongsModule } from '@modules/ky-songs/ky-songs.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    KySongsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
