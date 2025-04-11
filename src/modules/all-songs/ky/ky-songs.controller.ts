import { Controller, Get, Param, Query } from '@nestjs/common';
import { KySongsService } from '@modules/all-songs/ky/ky-songs.service';
import { KySongDto } from '@modules/all-songs/ky/dto/ky-song.dto';

@Controller('all-songs/ky')
export class KySongsController {
  constructor(private readonly kySongsService: KySongsService) {}

  @Get('search')
  async search(
    @Query('title') title?: string,
    @Query('singer') singer?: string,
  ): Promise<{
    title?: KySongDto[];
    singer?: KySongDto[];
    success: boolean;
  }> {
    return this.kySongsService.search({ title, singer });
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<{
    song: KySongDto;
    success: boolean;
  }> {
    return this.kySongsService.findOne(+id);
  }
}
