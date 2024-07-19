import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsString,
} from 'class-validator';

export class CreateSongDto {
  @ApiProperty({
    example: 'Vara nu dorm',
    description: 'The name of the song.',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '1', description: 'The id of the artist.' })
  @IsNumberString()
  @IsNotEmpty()
  artistId: number;

  @ApiProperty({
    example: '123',
    description: 'The duration in seconds of the song.',
  })
  @IsNumberString()
  @IsNotEmpty()
  duration: number;
}
