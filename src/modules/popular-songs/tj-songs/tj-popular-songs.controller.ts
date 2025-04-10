import { Controller, Get } from '@nestjs/common';
import { TjPopularSongsService } from '@modules/popular-songs/tj-songs/tj-popular-songs.service';
import { TjPopularSong } from '@modules/popular-songs/tj-songs/entities/tj-popular-song.entity';

@Controller('popular-songs/tj-songs')
export class TjPopularSongsController {
  constructor(private readonly tjPopularSongsService: TjPopularSongsService) {}

  @Get()
  async findAll(): Promise<{
    songs: TjPopularSong[];
    success: boolean;
  }> {
    return this.tjPopularSongsService.findAll();
  }
}
