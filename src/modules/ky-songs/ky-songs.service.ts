import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../../common/utils/supabase.util';
import { KySong } from './entities/ky-song.entity';

@Injectable()
export class KySongsService {
  private readonly tableName = 'ky_songs';

  constructor(private readonly supabaseService: SupabaseService) {}

  async findAll(): Promise<KySong[]> {
    const { data, error } = await this.supabaseService.client
      .from(this.tableName)
      .select('*');

    if (error) {
      throw error;
    }

    return data;
  }

  async findOne(id: number): Promise<KySong> {
    const { data, error } = await this.supabaseService.client
      .from(this.tableName)
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw error;
    }

    return data;
  }

  async search(query: string): Promise<KySong[]> {
    const { data, error } = await this.supabaseService.client
      .from(this.tableName)
      .select('*')
      .or(`title.ilike.%${query}%,artist.ilike.%${query}%`);

    if (error) {
      throw error;
    }

    return data;
  }
}
