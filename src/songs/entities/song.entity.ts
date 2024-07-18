// src/songs/entities/song.entity.ts
import { Album } from 'src/albums/entities/album.entity';
import { Artist } from 'src/artists/entities/artist.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Song {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Artist, (artist) => artist.songs)
  artist: Artist;

  @ManyToOne(() => Album, (album) => album.songs)
  album: Album;
}
