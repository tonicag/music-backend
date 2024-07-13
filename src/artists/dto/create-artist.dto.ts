import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsString,
} from 'class-validator';

export class CreateArtistDto {
  @ApiProperty({
    example: 'Inna',
    description: 'The name of the artist',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '123',
    description: 'The age of the artist',
  })
  @IsNumber()
  @IsNotEmpty()
  age: number;
}
