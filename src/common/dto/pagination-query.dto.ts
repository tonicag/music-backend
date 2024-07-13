import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsInt, IsString, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationQueryDto {
  @ApiProperty({ required: false, example: 1, description: 'Page number' })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  page?: number;

  @ApiProperty({
    required: false,
    description: 'Number of items per page',
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  limit?: number;

  @ApiProperty({
    required: false,
    description: 'Column to filter by',
  })
  @IsOptional()
  @IsString()
  filterColumn?: string;

  @ApiProperty({
    required: false,
    description: 'Value to filter by',
  })
  @IsOptional()
  @IsString()
  filterValue?: string;

  @ApiProperty({
    required: false,
    description: 'Search term',
  })
  @IsOptional()
  @IsString()
  searchKey?: string;
}
