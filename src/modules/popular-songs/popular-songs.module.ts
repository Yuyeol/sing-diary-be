import { Module } from '@nestjs/common';
import { KySongsModule } from '@app/modules/popular-songs/ky/ky-songs.module';
import { TjSongsModule } from '@app/modules/popular-songs/tj/tj-songs.module';

@Module({
  imports: [KySongsModule, TjSongsModule],
  exports: [KySongsModule, TjSongsModule],
})
export class PopularSongsModule {}
