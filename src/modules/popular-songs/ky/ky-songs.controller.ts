import { Controller, Get } from '@nestjs/common';
import { KySongsService } from '@modules/popular-songs/ky/ky-songs.service';
import { KySongDto } from '@modules/all-songs/ky/dto/ky-song.dto';

@Controller('popular-songs/ky')
export class KySongsController {
  constructor(private readonly kySongsService: KySongsService) {}

  @Get()
  async findAll(): Promise<{
    songs: KySongDto[];
    success: boolean;
  }> {
    return this.kySongsService.findAll();
  }
}
