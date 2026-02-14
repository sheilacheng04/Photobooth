import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateGuestbookEntryDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  title?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  message: string;
}
