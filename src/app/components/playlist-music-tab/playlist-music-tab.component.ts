import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {AsyncPipe, DatePipe, DecimalPipe} from '@angular/common';
import {DurationPipe} from '../../shared/pipes/duration.pipe';
import {ImgConverterPipe} from '../../shared/pipes/img-converter.pipe';
import {MatIconButton} from '@angular/material/button';
import {MatMenu, MatMenuItem} from '@angular/material/menu';
import {TrackModel} from '../../models/track.model';
import {filter, Observable, Subscription} from 'rxjs';
import {PlaylistModel} from '../../models/playlist.model';
import {Store} from '@ngrx/store';
import {PlayState} from '../../ngrx/play/play.state';
import {AuthState} from '../../ngrx/auth/auth.state';
import {PlaylistState} from '../../ngrx/playlist/playlist.state';
import * as PlayActions from '../../ngrx/play/play.action';
import * as PlaylistActions from '../../ngrx/playlist/playlist.action';
import {MatIcon} from '@angular/material/icon';
import {MaterialModule} from '../../shared/modules/material.module';
import {Actions, ofType} from '@ngrx/effects';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ShareSnackbarComponent} from '../share-snackbar/share-snackbar.component';

@Component({
  selector: 'app-playlist-music-tab',
  imports: [
    AsyncPipe,
    DatePipe,
    DecimalPipe,
    DurationPipe,
    ImgConverterPipe,
    MaterialModule
  ],
  templateUrl: './playlist-music-tab.component.html',
  styleUrl: './playlist-music-tab.component.scss'
})
export class PlaylistMusicTabComponent implements OnInit, OnDestroy {
  @Input() track!: TrackModel;
  @Input() playlistId!: string;
  @Input() playlistTitle!: string;


  playlists$!: Observable<PlaylistModel[]>;
  subscriptions: Subscription[] = [];
  currentUserId!: string;


  constructor(
    private store: Store<{
      play: PlayState,
      auth: AuthState,
      playlist: PlaylistState,
    }>,
    private actions$: Actions,
  ) {
  }


  ngOnInit(): void {
    this.playlists$ = this.store.select('playlist', 'playlists');

    this.subscriptions.push(
      this.store.select(state => state.auth.currentUser).subscribe(user => {
        this.currentUserId = user ? user.id : '';
      }),
      this.actions$.pipe(
        ofType(PlaylistActions.addTrackToPlaylistSuccess),
        filter(action => !!action.playlist) // chỉ nhận khi có playlist trả về
      ).subscribe(() => {
        this.openSnackBar('Track added to playlist successfully!');
      })
    );
  }

  onPlayTrack(track: TrackModel) {
    console.log('Playing track:', track);
    this.store.dispatch(PlayActions.setTrack({track}));
  }


  onOpenAddToPlaylist() {
    if (this.currentUserId) {
      this.store.dispatch(
        PlaylistActions.getPlaylists({userId: this.currentUserId})
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
    // const sub = this.store
    //   .select('playlist')
    //   .subscribe(state => {
    //     if (!state.loading && !state.error) {
    //       // Reload lại trang sau khi xóa
    //       window.location.reload();
    //     }
    //   });
    // this.subscriptions.push(sub);
  }

  onRemoveTrackFromPlaylist(playlistId: string) {
    if (!this.track || !playlistId) return;

    this.store.dispatch(
      PlaylistActions.removeTrackFromPlaylist({
        playlistId,
        trackId: this.track.id
      })
    );

    const sub = this.store
      .select('playlist')
      .subscribe(state => {
        if (!state.isLoading && !state.error) {
          // Reload lại trang sau khi xóa
          window.location.reload();
        }
      });
    this.subscriptions.push(sub);
  }

  private _snackBar = inject(MatSnackBar);

  durationInSeconds = 3;

  openSnackBar(content: string) {
    this._snackBar.openFromComponent(ShareSnackbarComponent, {
      data: content,
      duration: this.durationInSeconds * 1000,
    });
  }


  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }


}
