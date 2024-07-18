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
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { PaginatedResponseDto } from 'src/common/dto/pagination-respone.dto';
import { CreateSongDto } from 'src/songs/dto/create-song.dto';
import { UpdateSongDto } from 'src/songs/dto/update-song.dto';
import { Song } from 'src/songs/entities/song.entity';
import { SongsService } from 'src/songs/songs.service';

@ApiTags('songs')
@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Post()
  @ApiOperation({ summary: 'Create song.' })
  async createSong(@Body() createSongDto: CreateSongDto) {
    return await this.songsService.createSong(createSongDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all songs.' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'filterColumn', required: false, type: String })
  @ApiQuery({ name: 'filterValue', required: false, type: String })
  @ApiQuery({ name: 'searchKey', required: false, type: String })
  async findAll(
    @Query() queryOptionsDto: PaginationQueryDto,
  ): Promise<PaginatedResponseDto<Song>> {
    return this.songsService.findAll(queryOptionsDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a song' })
  @ApiResponse({
    status: 200,
    description: 'Song has been successfully updated.',
    type: Song,
  })
  @ApiResponse({ status: 404, description: 'Song or Artist not found.' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSongDto: UpdateSongDto,
  ): Promise<Song> {
    return this.songsService.update(id, updateSongDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a song' })
  @ApiResponse({
    status: 200,
    description: 'Song has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Song not found.' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.songsService.remove(id);
  }
}
