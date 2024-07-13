import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumsModule } from './albums/albums.module';
import { ArtistsModule } from './artists/artists.module';
import { SongsModule } from './songs/songs.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'tonicag',
      password: '',
      database: 'soundzzz_db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AlbumsModule,
    ArtistsModule,
    SongsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}