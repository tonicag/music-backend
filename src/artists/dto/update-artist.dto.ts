import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateArtistDto {
  @ApiProperty({
    example: 'Inna',
    description: 'The name of the artist',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
