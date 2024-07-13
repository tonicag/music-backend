import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAlbumDTO } from 'src/albums/dto/create-album.dto';
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

    const queryBuilder: SelectQueryBuilder<Album> =
      this.albumsRepository.createQueryBuilder('album');

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
