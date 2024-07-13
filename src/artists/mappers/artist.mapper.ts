import { ArtistDto } from 'src/artists/dto/artist.dto';
import { Artist } from 'src/artists/entities/artist.entity';

export class ArtistMapper {
  static toArtistDto(artist: Artist): ArtistDto {
    return { id: artist.id, name: artist.name };
  }
}
