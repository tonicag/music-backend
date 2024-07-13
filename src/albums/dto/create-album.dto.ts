import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateAlbumDTO {
  @ApiProperty({
    example: 'Album Name',
    description: 'The name of the album.',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'This is a description of the album.',
    description: 'A brief description of the album.',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: 1,
    description: 'The ID of the artist.',
  })
  @IsNumber()
  @IsNotEmpty()
  artistId: number;

  @ApiProperty({
    example: [1, 2, 3],
    description: 'An optional list of song IDs associated with the album.',
    required: false,
  })
  @IsArray()
  @IsOptional()
  songIds?: number[];
}
