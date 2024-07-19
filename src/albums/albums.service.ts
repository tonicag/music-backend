import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAlbumDTO } from 'src/albums/dto/create-album.dto';
import { UpdateAlbumDTO } from 'src/albums/dto/update-album.dto';
import { Album } from 'src/albums/entities/album.entity';
import { ArtistsService } from 'src/artists/artists.service';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { PaginatedResponseDto } from 'src/common/dto/pagination-respone.dto';
import { SongsService } from 'src/songs/songs.service';
import { Repository, SelectQueryBuilder } from 'typeorm';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album)
    private readonly albumsRepository: Repository<Album>,
    private readonly artistsService: ArtistsService,
    private readonly songsService: SongsService,
  ) {}

  async findAll(
    queryOptionsDto: PaginationQueryDto,
  ): Promise<PaginatedResponseDto<Album>> {
    const {
      page = 1,
      limit = 10,
      filterColumn,
      filterValue,
      searchKey,
    } = queryOptionsDto;

    const queryBuilder: SelectQueryBuilder<Album> = this.albumsRepository
      .createQueryBuilder('album')
      .leftJoinAndSelect('album.songs', 'songs')
      .leftJoinAndSelect('album.artist', 'artist');

    if (filterColumn && filterValue) {
      queryBuilder.andWhere(`album.${filterColumn} = :filterValue`, {
        filterValue,
      });
    }

    if (searchKey) {
      queryBuilder.andWhere(`album.name LIKE :searchKey`, {
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

  async createAlbum(createAlbumDto: CreateAlbumDTO) {
    const artist = await this.artistsService.findOne(createAlbumDto.artist);

    if (!artist) {
      throw new NotFoundException(
        `Article with id = ${createAlbumDto.artist} was not found.`,
      );
    }

    const songs = createAlbumDto.songs
      ? await this.songsService.findAllByIds(createAlbumDto.songs || [])
      : [];

    const validSongs = songs.every(
      (s) => String(s.artist.id) === String(createAlbumDto.artist),
    );
    console.log({
      dd: songs.map((s) => s.artist),
      validSongs,
      artist: createAlbumDto.artist,
    });
    if (!validSongs) {
      throw new BadRequestException('One or more songs is invalid!');
    }

    const album = this.albumsRepository.create({
      ...createAlbumDto,
      songs,
      artist,
    });

    return await this.albumsRepository.save(album);
  }

  async updateAlbum(
    id: number,
    updateAlbumDto: UpdateAlbumDTO,
  ): Promise<Album> {
    const album = await this.albumsRepository.findOne({ where: { id } });

    if (!album) {
      throw new NotFoundException(`Album with id = ${id} was not found.`);
    }

    const artist = await this.artistsService.findOne(updateAlbumDto.artist);

    if (!artist) {
      throw new NotFoundException(
        `Artist with id = ${updateAlbumDto.artist} was not found.`,
      );
    }

    const songs = updateAlbumDto.songs
      ? await this.songsService.findAllByIds(updateAlbumDto.songs)
      : [];

    const validSongs = songs.every(
      (s) => String(s.artist.id) === String(updateAlbumDto.artist),
    );

    if (!validSongs) {
      throw new BadRequestException('One or more songs is invalid!');
    }
    Object.assign(album, updateAlbumDto, { artist, songs });

    return await this.albumsRepository.save(album);
  }

  async deleteAlbum(id: number): Promise<void> {
    const album = await this.albumsRepository.findOne({
      where: { id },
      relations: ['songs'],
    });

    if (!album) {
      throw new NotFoundException(`Album with id = ${id} was not found.`);
    }

    await this.songsService.setAlbumToNull(album.id);

    await this.albumsRepository.remove(album);
  }
}
