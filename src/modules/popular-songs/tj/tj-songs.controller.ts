import { Controller, Get } from '@nestjs/common';
import { TjSongsService } from '@app/modules/popular-songs/tj/tj-songs.service';
import { TjSong } from '@app/modules/popular-songs/tj/entities/tj-song.entity';

@Controller('popular-songs/tj')
export class TjSongsController {
  constructor(private readonly tjSongsService: TjSongsService) {}

  @Get()
  async findAll(): Promise<{
    songs: TjSong[];
    success: boolean;
  }> {
    return this.tjSongsService.findAll();
  }
}
