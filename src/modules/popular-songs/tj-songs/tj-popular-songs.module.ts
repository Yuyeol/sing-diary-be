import { Module } from '@nestjs/common';
import { TjPopularSongsController } from '@modules/popular-songs/tj-songs/tj-popular-songs.controller';
import { TjPopularSongsService } from '@modules/popular-songs/tj-songs/tj-popular-songs.service';
import { SupabaseService } from '@common/utils/supabase.util';
import { LoggerService } from '@common/logger/logger.service';

@Module({
  controllers: [TjPopularSongsController],
  providers: [TjPopularSongsService, SupabaseService, LoggerService],
  exports: [TjPopularSongsService],
})
export class TjPopularSongsModule {}
