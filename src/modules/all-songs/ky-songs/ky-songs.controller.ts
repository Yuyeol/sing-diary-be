import { Controller, Get, Param, Query } from '@nestjs/common';
import { KySongsService } from '@modules/all-songs/ky-songs/ky-songs.service';
import { KySong } from '@modules/all-songs/ky-songs/entities/ky-song.entity';

@Controller('all-songs/ky-songs')
export class KySongsController {
  constructor(private readonly kySongsService: KySongsService) {}

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<{
    song: KySong;
    success: boolean;
  }> {
    return this.kySongsService.findOne(+id);
  }

  @Get('search')
  async search(
    @Query('title') title: string,
    @Query('singer') singer: string,
  ): Promise<{
    title?: KySong[];
    singer?: KySong[];
    success: boolean;
  }> {
    return this.kySongsService.search({ title, singer });
  }
}
