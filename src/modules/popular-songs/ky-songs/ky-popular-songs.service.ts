import { Injectable } from '@nestjs/common';
import { SupabaseService } from '@common/utils/supabase.util';
import { KyPopularSong } from '@modules/popular-songs/ky-songs/entities/ky-popular-song.entity';
import { LoggerService } from '@common/logger/logger.service';

@Injectable()
export class KyPopularSongsService {
  private readonly tableName = 'ky_popular_songs';

  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly logger: LoggerService,
  ) {
    this.logger.setContext('KyPopularSongsService');
  }

  async findAll(): Promise<{
    songs: KyPopularSong[];
    success: boolean;
  }> {
    this.logger.log('모든 KY 인기차트 노래 조회 요청 시작');

    try {
      const { data, error } = await this.supabaseService.client
        .from(this.tableName)
        .select('*');

      if (error) {
        this.logger.error(
          `모든 KY 인기차트 노래 조회 중 오류 발생: ${error.message}`,
          error.stack,
        );
        throw error;
      }

      this.logger.logDatabase('SELECT', this.tableName, { count: data.length });
      this.logger.log(
        `모든 KY 인기차트 노래 조회 완료: ${data.length}개 레코드 조회됨`,
      );

      return { songs: data, success: true };
    } catch (error) {
      this.logger.error(`예상치 못한 오류 발생: ${error.message}`, error.stack);
      throw error;
    }
  }
}
