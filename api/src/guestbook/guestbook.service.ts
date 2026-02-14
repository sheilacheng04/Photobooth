import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateGuestbookEntryDto } from './dto/create-entry.dto';

@Injectable()
export class GuestbookService {
  private readonly TABLE = 'guestbook';

  constructor(private readonly supabase: SupabaseService) {}

  /**
   * Retrieve all guestbook entries, newest first.
   */
  async findAll() {
    const { data, error } = await this.supabase
      .getClient()
      .from(this.TABLE)
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase SELECT error:', error);
      throw new InternalServerErrorException('Failed to retrieve guestbook entries.');
    }

    return data;
  }

  /**
   * Insert a new guestbook entry.
   */
  async create(dto: CreateGuestbookEntryDto) {
    const { data, error } = await this.supabase
      .getClient()
      .from(this.TABLE)
      .insert({
        name: dto.name,
        title: dto.title || null,
        message: dto.message,
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase INSERT error:', error);
      throw new InternalServerErrorException('Failed to create guestbook entry.');
    }

    return data;
  }
}
