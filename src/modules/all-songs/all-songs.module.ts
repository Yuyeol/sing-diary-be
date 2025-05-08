import { Module } from '@nestjs/common';
import { KySongsModule } from '@modules/all-songs/ky/ky-songs.module';
import { TjSongsModule } from '@app/modules/all-songs/tj/tj-songs.module';

@Module({
  imports: [KySongsModule, TjSongsModule],
  exports: [KySongsModule, TjSongsModule],
})
export class AllSongsModule {}
