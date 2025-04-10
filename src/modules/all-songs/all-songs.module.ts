import { Module } from '@nestjs/common';
import { KySongsModule } from '@modules/all-songs/ky-songs/ky-songs.module';

@Module({
  imports: [KySongsModule],
  exports: [KySongsModule],
})
export class AllSongsModule {}
