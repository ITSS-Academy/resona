import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {MaterialModule} from '../../shared/modules/material.module';
import {TrackModel} from '../../models/track.model';
import {Store} from '@ngrx/store';
import {PlayState} from '../../ngrx/play/play.state';
import * as PlayActions from '../../ngrx/play/play.action';
import {DurationPipe} from '../../shared/pipes/duration.pipe';
import {AsyncPipe, DatePipe, DecimalPipe} from '@angular/common';
import {ImgConverterPipe} from '../../shared/pipes/img-converter.pipe';
import * as FavoriteActions from '../../ngrx/favorite/favorite.action';
import {PlaylistModel} from '../../models/playlist.model';
import {filter, Observable, Subscription, take} from 'rxjs';
import {AuthState} from '../../ngrx/auth/auth.state';
import {PlaylistState} from '../../ngrx/playlist/playlist.state';
import * as PlaylistActions from '../../ngrx/playlist/playlist.action';
import {TrackState} from '../../ngrx/track/track.state';
import {addTrackToPlaylist} from '../../ngrx/playlist/playlist.action';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ShareSnackbarComponent} from '../share-snackbar/share-snackbar.component';
import {MatDialogRef} from '@angular/material/dialog';
import {Actions, ofType} from '@ngrx/effects';
import {QueueState} from '../../ngrx/queue/queue.state';
import * as QueueActions from '../../ngrx/queue/queue.actions';
import {FavoriteState} from '../../ngrx/favorite/favorite.state';
import {Router} from '@angular/router';

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

  playlists$!: Observable<PlaylistModel[]>;
  favoriteTracks$!: Observable<TrackModel[]>;
  @Input() isFavorite = false;
  subscriptions: Subscription[] = [];
  currentUserId!: string;
  favoriteTracks: TrackModel[] = [];

  constructor(
    private router: Router,
    private store: Store<{
      play: PlayState;
      auth: AuthState;
      playlist: PlaylistState;
      track: TrackState;
      queue: QueueState;
      favorite: FavoriteState
    }>,
    private actions$: Actions
  ) {

  }

  onPlayTrack(track: TrackModel) {
    console.log('Playing track:', track);
    this.store.dispatch(PlayActions.setTrack({track}));
    this.store.dispatch(
      QueueActions.playSongNow({
        userId: this.currentUserId,
        trackId: track.id
      })
    );

    this.actions$.pipe(
      ofType(QueueActions.playSongNowSuccess),
      take(1)
    ).subscribe(() => {
      this.store.dispatch(QueueActions.getQueueByUser({userId: this.currentUserId}));
    });
  }

  onFavoriteTrack(track: TrackModel) {
    if (track.id && this.currentUserId) {
      if (this.isFavorite) {
        // Nếu đã favorite rồi thì remove
        this.store.dispatch(
          FavoriteActions.removeFromFavorite({
            songId: track.id,
            userId: this.currentUserId,
          })
        );
        this.isFavorite = false; // cập nhật lại UI
      } else {
        // Nếu chưa thì add
        this.store.dispatch(
          FavoriteActions.addToFavorite({
            songId: track.id,
            userId: this.currentUserId,
          })
        );
        this.isFavorite = true; // cập nhật lại UI
      }
    }
  }

  ngOnInit(): void {
    this.playlists$ = this.store.select('playlist', 'playlists');
    this.favoriteTracks$ = this.store.select('track', 'favoriteTracks');

    this.subscriptions.push(
      this.store
        .select((state) => state.auth.currentUser)
        .subscribe((user) => {
          this.currentUserId = user ? user.id : '';
        }),
      this.favoriteTracks$.subscribe((favoriteTracks) => {
        this.isFavorite = favoriteTracks.some(
          (favTrack) => favTrack.id === this.track.id
        );
      }),

      this.actions$.pipe(
        ofType(PlaylistActions.addTrackToPlaylistSuccess),
        filter(action => !!action.playlist) // chỉ nhận khi có playlist trả về
      ).subscribe(() => {
        this.openSnackBar('Track added to playlist successfully!');
      }),
      this.actions$
        .pipe(
          ofType(PlaylistActions.addTrackToPlaylistSuccess),
          filter((action) => !!action.playlist) // chỉ nhận khi có playlist trả về
        )
        .subscribe(() => {
          this.openSnackBar('Track added to playlist successfully!');
        }),
    );

  }

  onOpenAddToPlaylist() {
    if (this.currentUserId) {
      this.store.dispatch(
        PlaylistActions.getPlaylistForSelect({userId: this.currentUserId})
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

  navigateToSongDetail(id: string) {
    if (id) {
      this.router.navigate([`/song-detail/${id}`]).then();
    }
  }
}
