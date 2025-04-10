import { Controller, Get, Param, Query } from '@nestjs/common';
import { TjSongsService } from '@modules/all-songs/tj-songs/tj-songs.service';
import { TjSong } from '@modules/all-songs/tj-songs/entities/tj-song.entity';

@Controller('all-songs/tj-songs')
export class TjSongsController {
  constructor(private readonly tjSongsService: TjSongsService) {}

  @Get('search')
  async search(
    @Query('title') title?: string,
    @Query('singer') singer?: string,
  ): Promise<{
    title?: TjSong[];
    singer?: TjSong[];
    success: boolean;
  }> {
    return this.tjSongsService.search({ title, singer });
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<{
    song: TjSong;
    success: boolean;
  }> {
    return this.tjSongsService.findOne(+id);
  }
}
