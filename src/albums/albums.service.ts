import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAlbumDTO } from 'src/albums/dto/create-album.dto';
import { Album } from 'src/albums/entities/album.entity';
import { ArtistsService } from 'src/artists/artists.service';
import { SongsService } from 'src/songs/songs.service';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album)
    private readonly albumsRepository: Repository<Album>,
    private readonly artistsService: ArtistsService,
    private readonly songsService: SongsService,
  ) {}

  async findAll() {
    return await this.albumsRepository.find();
  }

  async createAlbum(createAlbumDto: CreateAlbumDTO) {
    const artist = await this.artistsService.findOne(createAlbumDto.artistId);

    if (!artist) {
      throw new NotFoundException(
        `Article with id = ${createAlbumDto.artistId} was not found.`,
      );
    }

    const songs = createAlbumDto.songIds
      ? await this.songsService.findAllByIds(createAlbumDto.songIds || [])
      : [];

    const album = this.albumsRepository.create({
      ...createAlbumDto,
      songs,
      artist,
    });

    return await this.albumsRepository.save(album);
  }
}
