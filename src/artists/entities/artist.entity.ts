import { Album } from 'src/albums/entities/album.entity';
import { Song } from 'src/songs/entities/song.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Artist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Album, (album) => album.artist)
  albums: Album[];

  @OneToMany(() => Song, (song) => song.artist)
  songs: Song[];
}
