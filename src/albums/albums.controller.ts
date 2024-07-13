import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseInterceptor } from 'interceptors/response.interceptors';
import { AlbumsService } from 'src/albums/albums.service';
import { CreateAlbumDTO } from 'src/albums/dto/create-album.dto';
import { Album } from 'src/albums/entities/album.entity';
import { Repository } from 'typeorm';

@ApiTags('albums')
@Controller('albums')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all albums.' })
  async getAllAlbums() {
    return this.albumsService.findAll();
  }

  @ApiOperation({ summary: 'Create album.' })
  @Post()
  async createAlbum(@Body() createAlbumDto: CreateAlbumDTO) {
    return await this.albumsService.createAlbum(createAlbumDto);
  }
}
