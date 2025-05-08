import { Controller, Get, Param, Query } from '@nestjs/common';
import { TjSongsService } from '@modules/all-songs/tj/tj-songs.service';
import { TjSongDto } from '@modules/all-songs/tj/dto/tj-song.dto';

@Controller('all-songs/tj')
export class TjSongsController {
  constructor(private readonly tjSongsService: TjSongsService) {}

  @Get('search')
  async search(
    @Query('title') title?: string,
    @Query('singer') singer?: string,
  ): Promise<{
    title?: TjSongDto[];
    singer?: TjSongDto[];
    success: boolean;
  }> {
    return this.tjSongsService.search({ title, singer });
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<{
    song: TjSongDto;
    success: boolean;
  }> {
    return this.tjSongsService.findOne(+id);
  }
}
