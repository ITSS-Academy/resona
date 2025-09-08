import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AsyncPipe, DatePipe, DecimalPipe} from '@angular/common';
import {DurationPipe} from '../../shared/pipes/duration.pipe';
import {ImgConverterPipe} from '../../shared/pipes/img-converter.pipe';
import {MatIconButton} from '@angular/material/button';
import {MatMenu, MatMenuItem} from '@angular/material/menu';
import {TrackModel} from '../../models/track.model';
import {Observable, Subscription} from 'rxjs';
import {PlaylistModel} from '../../models/playlist.model';
import {Store} from '@ngrx/store';
import {PlayState} from '../../ngrx/play/play.state';
import {AuthState} from '../../ngrx/auth/auth.state';
import {PlaylistState} from '../../ngrx/playlist/playlist.state';
import * as PlayActions from '../../ngrx/play/play.action';
import * as PlaylistActions from '../../ngrx/playlist/playlist.action';
import {MatIcon} from '@angular/material/icon';
import {MaterialModule} from '../../shared/modules/material.module';

@Component({
  selector: 'app-playlist-music-tab',
  imports: [
    AsyncPipe,
    DatePipe,
    DecimalPipe,
    DurationPipe,
    ImgConverterPipe,
    MatIcon,
    MatIconButton,
    MatMenu,
    MatMenuItem,
    MaterialModule
  ],
  templateUrl: './playlist-music-tab.component.html',
  styleUrl: './playlist-music-tab.component.scss'
})
export class PlaylistMusicTabComponent implements OnInit, OnDestroy {
  @Input() track!: TrackModel;
  playlists$!: Observable<PlaylistModel[]>;
  subscriptions: Subscription[] = [];
  currentUserId!: string;


  constructor(
    private store: Store<{
      play: PlayState,
      auth: AuthState,
      playlist: PlaylistState,
    }>
  ) {}

  onPlayTrack(track: TrackModel) {
    console.log('Playing track:', track);
    this.store.dispatch(PlayActions.setTrack({track}));
  }

  ngOnInit(): void {
    this.playlists$ = this.store.select('playlist', 'playlists');



    this.subscriptions.push(
      this.store.select(state => state.auth.currentUser).subscribe(user => {
        this.currentUserId = user ? user.uid : '';
      })
    );
  }


  onOpenAddToPlaylist() {
    if (this.currentUserId) {
      this.store.dispatch(
        PlaylistActions.getPlaylists({ userId: this.currentUserId })
      );
    }
  }

  onAddTrackToPlaylist(playlistId: string) {
    if (!this.track || !playlistId) return;

    this.store.dispatch(
      PlaylistActions.addTrackToPlaylist({
        playlistId,
        trackId: this.track.id
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }


}
