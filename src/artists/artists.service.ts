import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtistDto } from 'src/artists/dto/artist.dto';
import { CreateArtistDto } from 'src/artists/dto/create-artist.dto';
import { UpdateArtistDto } from 'src/artists/dto/update-artist.dto';
import { Artist } from 'src/artists/entities/artist.entity';
import { ArtistMapper } from 'src/artists/mappers/artist.mapper';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { PaginatedResponseDto } from 'src/common/dto/pagination-respone.dto';
import { Repository, SelectQueryBuilder } from 'typeorm';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistsRepository: Repository<Artist>,
  ) {}

  async findOne(id: number) {
    return await this.artistsRepository.findOne({ where: { id } });
  }

  async findAll(
    queryOptionsDto: PaginationQueryDto,
  ): Promise<PaginatedResponseDto<Artist>> {
    const {
      page = 1,
      limit = 10,
      filterColumn,
      filterValue,
      searchKey,
    } = queryOptionsDto;

    const queryBuilder: SelectQueryBuilder<Artist> = this.artistsRepository
      .createQueryBuilder('artist')
      .leftJoinAndSelect('artist.albums', 'albums')
      .leftJoinAndSelect('artist.songs', 'songs');

    if (filterColumn && filterValue) {
      queryBuilder.andWhere(`artist.${filterColumn} = :filterValue`, {
        filterValue,
      });
    }

    if (searchKey) {
      queryBuilder.andWhere(`artist.name LIKE :searchKey`, {
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

  async createArtist(creteArtistDto: CreateArtistDto): Promise<ArtistDto> {
    const artist = await this.artistsRepository.save(creteArtistDto);

    return ArtistMapper.toArtistDto(artist);
  }

  async updateArtist(
    id: number,
    updateSongDto: UpdateArtistDto,
  ): Promise<Artist> {
    const song = await this.artistsRepository.findOneBy({ id });
    if (!song) {
      throw new NotFoundException(`Song with ID ${id} not found`);
    }

    Object.assign(song, updateSongDto);
    return this.artistsRepository.save(song);
  }

  async remove(id: number): Promise<void> {
    const result = await this.artistsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Song with ID ${id} not found`);
    }
  }
}
