import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ArtistsService } from 'src/artists/artists.service';
import { ArtistDto } from 'src/artists/dto/artist.dto';
import { CreateArtistDto } from 'src/artists/dto/create-artist.dto';
import { UpdateArtistDto } from 'src/artists/dto/update-artist.dto';
import { Artist } from 'src/artists/entities/artist.entity';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { PaginatedResponseDto } from 'src/common/dto/pagination-respone.dto';

@ApiTags('artists')
@Controller('artists')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Post()
  @ApiOperation({ summary: 'Create artist' })
  @ApiResponse({
    status: 201,
    description: 'The artist has been successfully created.',
    type: ArtistDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  async createArtist(@Body() createArtistDto: CreateArtistDto) {
    return await this.artistsService.createArtist(createArtistDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all artists.' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'filterColumn', required: false, type: String })
  @ApiQuery({ name: 'filterValue', required: false, type: String })
  @ApiQuery({ name: 'searchKey', required: false, type: String })
  async findAll(
    @Query() queryOptionsDto: PaginationQueryDto,
  ): Promise<PaginatedResponseDto<Artist>> {
    return this.artistsService.findAll(queryOptionsDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an artist' })
  @ApiResponse({
    status: 200,
    description: 'Artist has been successfully updated.',
    type: Artist,
  })
  @ApiResponse({ status: 404, description: 'Artist not found.' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSongDto: UpdateArtistDto,
  ): Promise<Artist> {
    return this.artistsService.updateArtist(id, updateSongDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an artist' })
  @ApiResponse({
    status: 200,
    description: 'The artist has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Artist not found.' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.artistsService.remove(id);
  }
}
