import { Artist } from 'src/artists/entities/artist.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Song {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToOne(() => Artist, (artist) => artist.songs)
  artist: Artist;
}
