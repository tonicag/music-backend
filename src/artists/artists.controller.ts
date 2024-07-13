import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ArtistsService } from 'src/artists/artists.service';
import { ArtistDto } from 'src/artists/dto/artist.dto';
import { CreateArtistDto } from 'src/artists/dto/create-artist.dto';

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
}
