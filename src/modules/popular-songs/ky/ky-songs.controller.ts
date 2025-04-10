import { Controller, Get } from '@nestjs/common';
import { KySongsService } from '@app/modules/popular-songs/ky/ky-songs.service';
import { KySong } from '@app/modules/popular-songs/ky/entities/ky-song.entity';

@Controller('popular-songs/ky')
export class KySongsController {
  constructor(private readonly kySongsService: KySongsService) {}

  @Get()
  async findAll(): Promise<{
    songs: KySong[];
    success: boolean;
  }> {
    return this.kySongsService.findAll();
  }
}
