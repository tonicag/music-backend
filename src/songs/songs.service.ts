import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtistsService } from 'src/artists/artists.service';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { PaginatedResponseDto } from 'src/common/dto/pagination-respone.dto';
import { CreateSongDto } from 'src/songs/dto/create-song.dto';
import { UpdateSongDto } from 'src/songs/dto/update-song.dto';
import { Song } from 'src/songs/entities/song.entity';
import { In, Repository, SelectQueryBuilder } from 'typeorm';

@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(Song)
    private readonly songsRepository: Repository<Song>,
    private readonly artistsService: ArtistsService,
  ) {}

  async findAll(
    queryOptionsDto: PaginationQueryDto,
  ): Promise<PaginatedResponseDto<Song>> {
    const {
      page = 1,
      limit = 10,
      filterColumn,
      filterValue,
      searchKey,
    } = queryOptionsDto;
    const songs = await this.songsRepository.find();
    console.log({ songs });
    const queryBuilder: SelectQueryBuilder<Song> = this.songsRepository
      .createQueryBuilder('song')
      .leftJoinAndSelect('song.artist', 'artist');

    if (filterColumn && filterValue) {
      queryBuilder.andWhere(`song.${filterColumn} = :filterValue`, {
        filterValue,
      });
    }

    if (searchKey) {
      queryBuilder.andWhere(`song.name LIKE :searchKey`, {
        searchKey: `%${searchKey}%`,
      });
    }

    const [data, total] = await queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    const pageCount = Math.ceil(total / limit);
    const hasPreviousPage = page > 1;
    const hasNextPage = page < pageCount;

    return {
      meta: {
        page,
        take: limit,
        itemCount: total,
        pageCount,
        hasPreviousPage,
        hasNextPage,
      },
      data,
    };
  }

  async findAllByIds(ids: number[]) {
    return await this.songsRepository.find({
      where: { id: In(ids) },
    });
  }

  async createSong(createSongDto: CreateSongDto) {
    const artist = await this.artistsService.findOne(createSongDto.artistId);

    if (!artist) {
      throw new NotFoundException(
        `Artist with ID ${createSongDto.artistId} not found`,
      );
    }

    return await this.songsRepository.save({ ...createSongDto, artist });
  }

  async update(id: number, updateSongDto: UpdateSongDto): Promise<Song> {
    const song = await this.songsRepository.findOneBy({ id });
    if (!song) {
      throw new NotFoundException(`Song with ID ${id} not found`);
    }

    if (updateSongDto.artistId) {
      const artist = await this.artistsService.findOne(updateSongDto.artistId);
      if (!artist) {
        throw new NotFoundException(
          `Artist with ID ${updateSongDto.artistId} not found`,
        );
      }
      song.artist = artist;
    }

    Object.assign(song, updateSongDto);
    return this.songsRepository.save(song);
  }

  async remove(id: number): Promise<void> {
    const result = await this.songsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Song with ID ${id} not found`);
    }
  }
}
