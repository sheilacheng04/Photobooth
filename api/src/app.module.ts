import { Module } from '@nestjs/common';
import { GuestbookModule } from './guestbook/guestbook.module';
import { SupabaseModule } from './supabase/supabase.module';

@Module({
  imports: [SupabaseModule, GuestbookModule],
})
export class AppModule {}
