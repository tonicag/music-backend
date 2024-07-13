import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateSongDto } from 'src/songs/dto/create-song.dto';
import { SongsService } from 'src/songs/songs.service';

@ApiTags('songs')
@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @ApiOperation({ summary: 'Create song.' })
  @Post()
  async createSong(@Body() createSongDto: CreateSongDto) {
    return await this.songsService.createSong(createSongDto);
  }
}
