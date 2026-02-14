import { Controller, Get, Post, Body } from '@nestjs/common';
import { GuestbookService } from './guestbook.service';
import { CreateGuestbookEntryDto } from './dto/create-entry.dto';

@Controller('guestbook')
export class GuestbookController {
  constructor(private readonly guestbookService: GuestbookService) {}

  /**
   * GET /api/guestbook
   * Returns all guestbook entries, newest first.
   */
  @Get()
  async findAll() {
    return this.guestbookService.findAll();
  }

  /**
   * POST /api/guestbook
   * Creates a new guestbook entry.
   */
  @Post()
  async create(@Body() dto: CreateGuestbookEntryDto) {
    return this.guestbookService.create(dto);
  }
}
