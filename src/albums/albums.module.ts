import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from 'src/albums/entities/album.entity';

@Module({ imports: [TypeOrmModule.forFeature([Album])] })
export class AlbumsModule {}
