import { Controller, Get, Param, Query } from '@nestjs/common';
import { KySongsService } from '@modules/all-songs/ky/ky-songs.service';
import { KySong } from '@modules/all-songs/ky/entities/ky-song.entity';

@Controller('all-songs/ky')
export class KySongsController {
  constructor(private readonly kySongsService: KySongsService) {}

  @Get('search')
  async search(
    @Query('title') title?: string,
    @Query('singer') singer?: string,
  ): Promise<{
    title?: KySong[];
    singer?: KySong[];
    success: boolean;
  }> {
    return this.kySongsService.search({ title, singer });
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<{
    song: KySong;
    success: boolean;
  }> {
    return this.kySongsService.findOne(+id);
  }
}
