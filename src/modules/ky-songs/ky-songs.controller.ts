import { Controller, Get, Param, Query } from '@nestjs/common';
import { KySongsService } from '@modules/ky-songs/ky-songs.service';
import { KySong } from '@modules/ky-songs/entities/ky-song.entity';

@Controller('ky-songs')
export class KySongsController {
  constructor(private readonly kySongsService: KySongsService) {}

  @Get()
  async findAll(): Promise<KySong[]> {
    return this.kySongsService.findAll();
  }

  @Get('search')
  async search(@Query('q') query: string): Promise<KySong[]> {
    return this.kySongsService.search(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<KySong> {
    return this.kySongsService.findOne(+id);
  }
}
