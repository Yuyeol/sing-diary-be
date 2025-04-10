import { Module } from '@nestjs/common';
import { KyPopularSongsModule } from '@modules/popular-songs/ky-songs/ky-popular-songs.module';
import { TjPopularSongsModule } from '@modules/popular-songs/tj-songs/tj-popular-songs.module';

@Module({
  imports: [KyPopularSongsModule, TjPopularSongsModule],
  exports: [KyPopularSongsModule, TjPopularSongsModule],
})
export class PopularSongsModule {}
