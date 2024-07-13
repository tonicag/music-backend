import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtistsService } from 'src/artists/artists.service';
import { CreateSongDto } from 'src/songs/dto/create-song.dto';
import { Song } from 'src/songs/entities/song.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(Song)
    private readonly songsRepository: Repository<Song>,
    private readonly artistsService: ArtistsService,
  ) {}

  async findAllByIds(ids: number[]) {
    return await this.songsRepository.find({
      where: { id: In(ids) },
    });
  }

  async createSong(createSongDto: CreateSongDto) {
    const artist = await this.artistsService.findOne(createSongDto.artistId);

    if (!artist) {
      throw new NotFoundException();
    }

    return await this.songsRepository.save(createSongDto);
  }
}
