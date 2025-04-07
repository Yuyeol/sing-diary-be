import { Module } from '@nestjs/common';
import { KySongsController } from '@modules/ky-songs/ky-songs.controller';
import { KySongsService } from '@modules/ky-songs/ky-songs.service';
import { SupabaseService } from '@common/utils/supabase.util';
import { LoggerService } from '@common/logger/logger.service';

@Module({
  // export한 모듈이나 서비스를 사용할때 넣어준다.
  // imports: [],
  controllers: [KySongsController],
  // 모듈 내부에서 사용할 서비스를 넣어주어 컨스트럭터를 통해 사용할 수 있도록 한다.
  providers: [KySongsService, SupabaseService, LoggerService],
  // 다른 모듈에서 songs의 비즈니스 로직을 사용해야 할 때 export에 넣어주어야 한다.
  exports: [KySongsService],
})
export class KySongsModule {}
