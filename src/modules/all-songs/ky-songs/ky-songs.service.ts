import { Injectable } from '@nestjs/common';
import { SupabaseService } from '@common/utils/supabase.util';
import { KySong } from '@modules/all-songs/ky-songs/entities/ky-song.entity';
import { LoggerService } from '@common/logger/logger.service';

@Injectable()
export class KySongsService {
  private readonly tableName = 'ky_songs';

  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly logger: LoggerService,
  ) {
    this.logger.setContext('KySongsService');
  }

  async findAll(): Promise<KySong[]> {
    this.logger.log('모든 노래 조회 요청 시작');

    try {
      const { data, error } = await this.supabaseService.client
        .from(this.tableName)
        .select('*');

      if (error) {
        this.logger.error(
          `모든 노래 조회 중 오류 발생: ${error.message}`,
          error.stack,
        );
        throw error;
      }

      this.logger.logDatabase('SELECT', this.tableName, { count: data.length });
      this.logger.log(`모든 노래 조회 완료: ${data.length}개 레코드 조회됨`);

      return data;
    } catch (error) {
      this.logger.error(`예상치 못한 오류 발생: ${error.message}`, error.stack);
      throw error;
    }
  }

  async findOne(id: number): Promise<KySong> {
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

      return data;
    } catch (error) {
      this.logger.error(`예상치 못한 오류 발생: ${error.message}`, error.stack);
      throw error;
    }
  }

  async search(query: string): Promise<KySong[]> {
    this.logger.log(`검색 쿼리 '${query}'로 노래 검색 요청 시작`);

    try {
      const { data, error } = await this.supabaseService.client
        .from(this.tableName)
        .select('*')
        .or(`title.ilike.%${query}%,singer.ilike.%${query}%`);

      if (error) {
        this.logger.error(`검색 중 오류 발생: ${error.message}`, error.stack);
        throw error;
      }

      this.logger.logDatabase('SELECT', this.tableName, {
        search: query,
        count: data.length,
      });
      this.logger.log(`검색 완료: ${data.length}개 레코드 검색됨`);

      return data;
    } catch (error) {
      this.logger.error(`예상치 못한 오류 발생: ${error.message}`, error.stack);
      throw error;
    }
  }
}
