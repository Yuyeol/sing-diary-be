import { Injectable } from '@nestjs/common';
import { SupabaseService } from '@common/utils/supabase.util';
import { TjSong } from '@app/modules/all-songs/tj/entities/tj-song.entity';
import { LoggerService } from '@common/logger/logger.service';

@Injectable()
export class TjSongsService {
  private readonly tableName = 'tj_songs';

  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly logger: LoggerService,
  ) {
    this.logger.setContext('TjSongsService');
  }

  async search({
    singer,
    title,
  }: {
    singer?: string;
    title?: string;
  }): Promise<{
    title?: TjSong[];
    singer?: TjSong[];
    success: boolean;
  }> {
    this.logger.log(`검색 요청 시작: title="${title}", singer="${singer}"`);

    try {
      const result: { title?: TjSong[]; singer?: TjSong[] } = {
        title: [],
        singer: [],
      };

      if (title) {
        const { data, error } = await this.supabaseService.client
          .from(this.tableName)
          .select('*')
          .ilike('title', `%${title}%`);

        if (error) {
          this.logger.error(
            `제목 검색 중 오류 발생: ${error.message}`,
            error.stack,
          );
          throw error;
        }

        result.title = data || [];
        this.logger.log(`제목 검색 결과: ${result.title.length}개 항목`);
      }

      if (singer) {
        const { data, error } = await this.supabaseService.client
          .from(this.tableName)
          .select('*')
          .ilike('singer', `%${singer}%`);

        if (error) {
          this.logger.error(
            `가수 검색 중 오류 발생: ${error.message}`,
            error.stack,
          );
          throw error;
        }

        result.singer = data || [];
        this.logger.log(`가수 검색 결과: ${result.singer.length}개 항목`);
      }

      const titleCount = result.title.length;
      const singerCount = result.singer.length;

      this.logger.logDatabase('SELECT', this.tableName, {
        title,
        singer,
        title_count: titleCount,
        singer_count: singerCount,
      });

      this.logger.log(
        `검색 완료: 제목 ${titleCount}개, 가수 ${singerCount}개 레코드 검색됨`,
      );

      return { ...result, success: true };
    } catch (error) {
      this.logger.error(`예상치 못한 오류 발생: ${error.message}`, error.stack);
      throw error;
    }
  }

  async findOne(id: number): Promise<{
    song: TjSong;
    success: boolean;
  }> {
    this.logger.log(`ID가 ${id}인 노래 조회 요청 시작`);

    try {
      const { data, error } = await this.supabaseService.client
        .from(this.tableName)
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        this.logger.error(
          `ID ${id} 노래 조회 중 오류 발생: ${error.message}`,
          error.stack,
        );
        throw error;
      }

      this.logger.logDatabase('SELECT', this.tableName, { id });
      this.logger.log(`ID ${id} 노래 조회 완료`);

      return { song: data, success: true };
    } catch (error) {
      this.logger.error(`예상치 못한 오류 발생: ${error.message}`, error.stack);
      throw error;
    }
  }
}
