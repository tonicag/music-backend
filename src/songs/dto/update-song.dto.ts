import { IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateSongDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  artistId?: number;

  @IsOptional()
  @IsNumber()
  albumId?: number;
}
