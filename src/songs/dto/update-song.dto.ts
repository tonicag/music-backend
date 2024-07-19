import {
  IsOptional,
  IsString,
  IsNumber,
  IsNumberString,
} from 'class-validator';

export class UpdateSongDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumberString()
  artistId?: number;

  @IsOptional()
  @IsNumberString()
  albumId?: number;
}
