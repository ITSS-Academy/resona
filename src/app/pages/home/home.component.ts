import {Component, OnDestroy, OnInit} from '@angular/core';
import {PlayerBarComponent} from '../../components/player-bar/player-bar.component';
import { MatIconModule } from '@angular/material/icon';
import {MusicGenresService} from '../../services/music-genres/music-genres.service';
import {MusicGenresModel} from '../../models/musicGenres.model';
import {Router} from '@angular/router';
import {MusicGenresState} from '../../ngrx/musicGenres/musicGenres.state';
import {Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import * as MusicGenresActions from '../../ngrx/musicGenres/musicGenres.actions';
import {AlbumModel} from '../../models/album.model';
import {AlbumState} from '../../ngrx/album/album.state';
import * as AlbumActions from '../../ngrx/album/album.actions';
import {AsyncPipe} from '@angular/common';
import {TrackModel} from '../../models/track.model';
import * as PlayActions from '../../ngrx/play/play.action';
import {SongModel} from '../../models/song.model';
import {ProfileModel} from '../../models/profile.model';
import {PlaylistModel} from '../../models/playlist.model';

@Component({
  selector: 'app-home',
  imports: [
    MatIconModule,
    AsyncPipe
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit , OnDestroy{

  musicGenresList$!: Observable<MusicGenresModel[]>;
  albumList$!: Observable<AlbumModel[]>;
  subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private store: Store<{
      musicGenres: MusicGenresState,
      albums : AlbumState,
    }>
  ) {
    this.musicGenresList$ = this.store.select('musicGenres', 'musicGenres');
    this.albumList$ = this.store.select('albums', 'albumList');
    this.getAllMusicGenres();
    this.getAllAlbums();
  }

  getAllMusicGenres() {
    this.store.dispatch(MusicGenresActions.getAllMusicGenres());
  }

  getAllAlbums(){
    this.store.dispatch(AlbumActions.getAllAlbums());
  }

  navigateToCategoryDetail(id: string) {
    this.router.navigate(['/category-detail', id]).then();
  }

  navigateToSongDetail(id: string) {
    this.router.navigate(['/song-detail', id]).then();
  }

  ngOnInit() {
    this.subscriptions.push(
      this.musicGenresList$.subscribe((musicGenres: MusicGenresModel[]) => {
        console.log(musicGenres);
      }),
      this.albumList$.subscribe((albums: AlbumModel[]) => {
        console.log(albums);
      })
    )
  }

  onPlayTrack(track: TrackModel) {
    console.log('Playing track:', track);
    this.store.dispatch(PlayActions.play({track}));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
