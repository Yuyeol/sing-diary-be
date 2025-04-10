import { Controller, Get } from '@nestjs/common';
import { KyPopularSongsService } from '@modules/popular-songs/ky-songs/ky-popular-songs.service';
import { KyPopularSong } from '@modules/popular-songs/ky-songs/entities/ky-popular-song.entity';

@Controller('popular-songs/ky-songs')
export class KyPopularSongsController {
  constructor(private readonly kyPopularSongsService: KyPopularSongsService) {}

  @Get()
  async findAll(): Promise<{
    songs: KyPopularSong[];
    success: boolean;
  }> {
    return this.kyPopularSongsService.findAll();
  }
}
