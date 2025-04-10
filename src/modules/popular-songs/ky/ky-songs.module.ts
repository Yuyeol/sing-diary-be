import { Module } from '@nestjs/common';
import { KySongsController } from '@app/modules/popular-songs/ky/ky-songs.controller';
import { KySongsService } from '@app/modules/popular-songs/ky/ky-songs.service';
import { SupabaseService } from '@common/utils/supabase.util';
import { LoggerService } from '@common/logger/logger.service';

@Module({
  controllers: [KySongsController],
  providers: [KySongsService, SupabaseService, LoggerService],
  exports: [KySongsService],
})
export class KySongsModule {}
