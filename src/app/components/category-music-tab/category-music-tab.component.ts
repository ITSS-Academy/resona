import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {AsyncPipe, DatePipe, DecimalPipe} from "@angular/common";
import {DurationPipe} from "../../shared/pipes/duration.pipe";
import {ImgConverterPipe} from "../../shared/pipes/img-converter.pipe";
import {TrackModel} from '../../models/track.model';
import {filter, Observable, Subscription, take} from 'rxjs';
import {PlaylistModel} from '../../models/playlist.model';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {PlayState} from '../../ngrx/play/play.state';
import {AuthState} from '../../ngrx/auth/auth.state';
import {PlaylistState} from '../../ngrx/playlist/playlist.state';
import {Actions, ofType} from '@ngrx/effects';
import * as PlaylistActions from '../../ngrx/playlist/playlist.action';
import * as PlayActions from '../../ngrx/play/play.action';
import * as QueueActions from '../../ngrx/queue/queue.actions';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ShareSnackbarComponent} from '../share-snackbar/share-snackbar.component';
import {MaterialModule} from '../../shared/modules/material.module';
import * as FavoriteActions from '../../ngrx/favorite/favorite.action';
import {PlaylistService} from '../../services/playlist/playlist.service';

@Component({
  selector: 'app-category-music-tab',
  imports: [
    AsyncPipe,
    DatePipe,
    DecimalPipe,
    DurationPipe,
    ImgConverterPipe,
    MaterialModule
  ],
  templateUrl: './category-music-tab.component.html',
  styleUrl: './category-music-tab.component.scss'
})
export class CategoryMusicTabComponent implements OnInit, OnDestroy {
  @Input() track!: TrackModel;
  @Input() playlistId!: string;
  @Input() playlistTitle!: string;
  @Input() isFavorite = false;


  playlists$!: Observable<PlaylistModel[]>;
  subscriptions: Subscription[] = [];
  currentUserId!: string;


  constructor(
    private router: Router,
    private store: Store<{
      play: PlayState,
      auth: AuthState,
      playlist: PlaylistState,
    }>,
    private actions$: Actions,
    private playlistService: PlaylistService
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


  onOpenAddToPlaylist() {
    if (this.currentUserId) {
      this.store.dispatch(
        PlaylistActions.getPlaylists({userId: this.currentUserId})
      );
    }
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

  navigateToSongDetail(id: string) {
    if (id) {
      this.router.navigate([`/song-detail/${id}`]).then();
    }
  }


}
