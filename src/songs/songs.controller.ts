import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { ResponseInterceptor } from 'interceptors/response.interceptors';
import { CreateSongDto } from 'src/songs/dto/create-song.dto';
import { SongsService } from 'src/songs/songs.service';

@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @ApiOperation({ summary: 'Create song.' })
  @Post()
  async createSong(@Body() createSongDto: CreateSongDto) {
    return await this.songsService.createSong(createSongDto);
  }
}
