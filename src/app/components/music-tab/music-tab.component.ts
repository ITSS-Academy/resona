import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import { MaterialModule } from '../../shared/modules/material.module';
import { TrackModel } from '../../models/track.model';
import { Store } from '@ngrx/store';
import { PlayState } from '../../ngrx/play/play.state';
import * as PlayActions from '../../ngrx/play/play.action';
import { DurationPipe } from '../../shared/pipes/duration.pipe';
import { AsyncPipe, DatePipe, DecimalPipe } from '@angular/common';
import { ImgConverterPipe } from '../../shared/pipes/img-converter.pipe';
import * as FavoriteActions from '../../ngrx/favorite/favorite.action';
import { PlaylistModel } from '../../models/playlist.model';
import {filter, Observable, Subscription} from 'rxjs';
import { AuthState } from '../../ngrx/auth/auth.state';
import { PlaylistState } from '../../ngrx/playlist/playlist.state';
import * as PlaylistActions from '../../ngrx/playlist/playlist.action';
import { addTrackToPlaylist } from '../../ngrx/playlist/playlist.action';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ShareSnackbarComponent} from '../share-snackbar/share-snackbar.component';
import {MatDialogRef} from '@angular/material/dialog';
import {Actions, ofType} from '@ngrx/effects';

@Component({
  selector: 'app-music-tab',
  imports: [
    MaterialModule,
    DurationPipe,
    DatePipe,
    DecimalPipe,
    ImgConverterPipe,
    AsyncPipe,
  ],
  templateUrl: './music-tab.component.html',
  styleUrl: './music-tab.component.scss',
})
export class MusicTabComponent implements OnInit, OnDestroy {
  @Input() track!: TrackModel;
  @Input() userId!: string;

  playlists$!: Observable<PlaylistModel[]>;
  subscriptions: Subscription[] = [];
  currentUserId!: string;

  constructor(
    private store: Store<{
      play: PlayState;
      auth: AuthState;
      playlist: PlaylistState;
    }>,
    private actions$: Actions

  ) {}

  onPlayTrack(track: TrackModel) {
    console.log('Playing track:', track);
    this.store.dispatch(PlayActions.setTrack({ track }));
  }

  onFavoriteTrack(track: TrackModel) {
    if (this.userId && track.id) {
      this.store.dispatch(
        FavoriteActions.addToFavorite({ userId: this.userId, songId: track.id })
      );
    }
  }

  ngOnInit(): void {
    this.playlists$ = this.store.select('playlist', 'playlists');

    this.subscriptions.push(
      this.store
        .select((state) => state.auth.currentUser)
        .subscribe((user) => {
          this.currentUserId = user ? user.uid : '';
        }),

      this.actions$.pipe(
        ofType(PlaylistActions.addTrackToPlaylistSuccess),
        filter(action => !!action.playlist) // chỉ nhận khi có playlist trả về
      ).subscribe(() => {
        this.openSnackBar('Track added to playlist successfully!');
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
        trackId: this.track.id,
      })
    );
  }

  private _snackBar = inject(MatSnackBar);

  durationInSeconds = 10;

  openSnackBar(content: string) {
    this._snackBar.openFromComponent(ShareSnackbarComponent, {
      data: content,
      duration: this.durationInSeconds * 1000,
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
