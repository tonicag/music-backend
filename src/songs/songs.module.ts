import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Song } from 'src/songs/entities/song.entity';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { ArtistsModule } from 'src/artists/artists.module';

@Module({
  imports: [ArtistsModule, TypeOrmModule.forFeature([Song])],
  controllers: [SongsController],
  providers: [SongsService],
  exports: [SongsService],
})
export class SongsModule {}
