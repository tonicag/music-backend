import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AlbumsService } from 'src/albums/albums.service';
import { CreateAlbumDTO } from 'src/albums/dto/create-album.dto';
import { UpdateAlbumDTO } from 'src/albums/dto/update-album.dto';
import { Album } from 'src/albums/entities/album.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { PaginatedResponseDto } from 'src/common/dto/pagination-respone.dto';

@ApiTags('albums')
@Controller('albums')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @ApiResponse({
    status: 200,
    description: 'Successful response',
    type: PaginatedResponseDto,
  })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'filterColumn', required: false, type: String })
  @ApiQuery({ name: 'filterValue', required: false, type: String })
  @ApiQuery({ name: 'searchKey', required: false, type: String })
  @Get()
  async findAll(
    @Query() queryOptionsDto: PaginationQueryDto,
  ): Promise<PaginatedResponseDto<Album>> {
    return this.albumsService.findAll(queryOptionsDto);
  }

  @ApiOperation({ summary: 'Create album.' })
  @Post()
  async createAlbum(@Body() createAlbumDto: CreateAlbumDTO): Promise<Album> {
    return this.albumsService.createAlbum(createAlbumDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing album' })
  @ApiResponse({
    status: 200,
    description: 'The album has been successfully updated.',
    type: Album,
  })
  async updateAlbum(
    @Param('id') id: number,
    @Body() updateAlbumDto: UpdateAlbumDTO,
  ): Promise<Album> {
    return this.albumsService.updateAlbum(id, updateAlbumDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an existing album' })
  @ApiResponse({
    status: 200,
    description: 'The album has been successfully deleted.',
  })
  async deleteAlbum(@Param('id') id: number): Promise<void> {
    return this.albumsService.deleteAlbum(id);
  }
}
