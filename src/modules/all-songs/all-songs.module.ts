import { Module } from '@nestjs/common';
import { KySongsModule } from '@modules/all-songs/ky-songs/ky-songs.module';
import { TjSongsModule } from '@modules/all-songs/tj-songs/tj-songs.module';

@Module({
  imports: [KySongsModule, TjSongsModule],
  exports: [KySongsModule, TjSongsModule],
})
export class AllSongsModule {}
