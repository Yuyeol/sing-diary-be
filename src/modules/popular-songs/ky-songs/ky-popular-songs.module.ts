import { Module } from '@nestjs/common';
import { KyPopularSongsController } from '@modules/popular-songs/ky-songs/ky-popular-songs.controller';
import { KyPopularSongsService } from '@modules/popular-songs/ky-songs/ky-popular-songs.service';
import { SupabaseService } from '@common/utils/supabase.util';
import { LoggerService } from '@common/logger/logger.service';

@Module({
  controllers: [KyPopularSongsController],
  providers: [KyPopularSongsService, SupabaseService, LoggerService],
  exports: [KyPopularSongsService],
})
export class KyPopularSongsModule {}
