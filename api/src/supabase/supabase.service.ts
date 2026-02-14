import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private client: SupabaseClient;

  constructor() {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!url || !key) {
      console.warn(
        'SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY not set. Supabase calls will fail.',
      );
    }

    this.client = createClient(url || '', key || '');
  }

  getClient(): SupabaseClient {
    return this.client;
  }
}
