import { Module } from '@nestjs/common';
import { TjSongsController } from '@app/modules/all-songs/tj/tj-songs.controller';
import { TjSongsService } from '@app/modules/all-songs/tj/tj-songs.service';
import { SupabaseService } from '@common/utils/supabase.util';
import { LoggerService } from '@common/logger/logger.service';

@Module({
  controllers: [TjSongsController],
  providers: [TjSongsService, SupabaseService, LoggerService],
  exports: [TjSongsService],
})
export class TjSongsModule {}
