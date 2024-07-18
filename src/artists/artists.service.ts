import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtistDto } from 'src/artists/dto/artist.dto';
import { CreateArtistDto } from 'src/artists/dto/create-artist.dto';
import { Artist } from 'src/artists/entities/artist.entity';
import { ArtistMapper } from 'src/artists/mappers/artist.mapper';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistsRepository: Repository<Artist>,
  ) {}

  async findOne(id: number) {
    return await this.artistsRepository.findOne({ where: { id } });
  }

  async getAllArtists() {
    return await this.artistsRepository.find();
  }

  async createArtist(creteArtistDto: CreateArtistDto): Promise<ArtistDto> {
    const artist = await this.artistsRepository.save(creteArtistDto);

    return ArtistMapper.toArtistDto(artist);
  }
}
