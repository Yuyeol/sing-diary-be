import { Controller, Get } from '@nestjs/common';
import { TjSongsService } from '@modules/popular-songs/tj/tj-songs.service';
import { TjSongDto } from '@modules/all-songs/tj/dto/tj-song.dto';

@Controller('popular-songs/tj')
export class TjSongsController {
  constructor(private readonly tjSongsService: TjSongsService) {}

  @Get()
  async findAll(): Promise<{
    songs: TjSongDto[];
    success: boolean;
  }> {
    return this.tjSongsService.findAll();
  }
}
