import { ApiProperty } from '@nestjs/swagger';

export class PaginationMetaDto {
  @ApiProperty({ description: 'Current page number' })
  page: number;

  @ApiProperty({ description: 'Number of items per page' })
  take: number;

  @ApiProperty({ description: 'Total number of items' })
  itemCount: number;

  @ApiProperty({ description: 'Total number of pages' })
  pageCount: number;

  @ApiProperty({ description: 'Indicates if there is a previous page' })
  hasPreviousPage: boolean;

  @ApiProperty({ description: 'Indicates if there is a next page' })
  hasNextPage: boolean;
}
