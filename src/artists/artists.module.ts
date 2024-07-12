import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from 'src/artists/entities/artist.entity';

@Module({ imports: [TypeOrmModule.forFeature([Artist])] })
export class ArtistsModule {}
