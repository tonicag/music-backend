import { Artist } from 'src/artists/entities/artist.entity';
import { Song } from 'src/songs/entities/song.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Album {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => Artist, (artist) => artist.albums)
  artist: Artist;

  @OneToMany(() => Song, (song) => song.album)
  songs: Song[];
}
