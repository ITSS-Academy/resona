import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {MaterialModule} from '../../shared/modules/material.module';
import {MatDialog} from '@angular/material/dialog';
import {CreatePlaylistDialogComponent} from '../../components/create-playlist-dialog/create-playlist-dialog.component';
import {combineLatest, map, Observable, Subscription, take} from 'rxjs';
import {PlaylistModel} from '../../models/playlist.model';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {PlaylistState} from '../../ngrx/playlist/playlist.state';
import * as playlistActions from '../../ngrx/playlist/playlist.action';
import * as trackActions from '../../ngrx/track/track.action';
import * as QueueActions from '../../ngrx/queue/queue.actions';
import {TrackModel} from '../../models/track.model';
import {AuthState} from '../../ngrx/auth/auth.state';
import {TrackState} from '../../ngrx/track/track.state';
import {AsyncPipe} from '@angular/common';
import {PlaylistMusicTabComponent} from '../../components/playlist-music-tab/playlist-music-tab.component';
import {PlaylistDetailButtonComponent} from '../../components/playlist-detail-button/playlist-detail-button.component';
import {ShareSnackbarComponent} from '../../components/share-snackbar/share-snackbar.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Actions, ofType} from '@ngrx/effects';
import {ProfileModel} from '../../models/profile.model';
import {FavoriteState} from '../../ngrx/favorite/favorite.state';

@Component({
  selector: 'app-playlist-detail',
  imports: [
    MaterialModule,
    AsyncPipe,
    PlaylistMusicTabComponent,
    PlaylistDetailButtonComponent,
  ],
  templateUrl: './playlist-detail.component.html',
  styleUrls: ['./playlist-detail.component.scss'],
})
export class PlaylistDetailComponent implements OnInit, OnDestroy {
  isLoading$!: Observable<boolean>;
  isLoading!: boolean;
  error$!: Observable<string | null>;
  playlistId!: string;
  playlistDetail$!: Observable<PlaylistModel>;
  playlistDetail!: PlaylistModel;
  tracks$!: Observable<TrackModel[]>;
  playlistName: string = '';
  totalMinutes$!: Observable<string>;
  currentUser$!: Observable<ProfileModel>;
  userId!: string;

  playlistOwnerId!: string;

  subscriptions: Subscription[] = [];

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private store: Store<{
      playlist: PlaylistState;
      auth: AuthState;
      favorite: FavoriteState
    }>,
    private actions$: Actions,
    private router: Router,
  ) {
  }

  openEditDialog() {
    this.dialog.open(CreatePlaylistDialogComponent, {
      width: '700px',
      panelClass: 'custom-dialog-container',
      data: {
        playlistId: this.playlistId,
        playlist: this.playlistDetail$  // truyền observable hoặc giá trị playlist
      }

    });
  }

  addAllToQueue() {
    if (this.userId && this.playlistId) {
      this.store.dispatch(
        QueueActions.addPlaylistToQueue({
          userId: this.userId,
          playlistId: this.playlistId,
        })
      );

      this.actions$.pipe(
        ofType(QueueActions.addPlaylistToQueueSuccess),
        take(1)
      ).subscribe(() => {
        this.store.dispatch(QueueActions.getQueueByUser({userId: this.userId}));
      });
    }
  }

  ngOnInit() {
    this.isLoading$ = this.store.select('playlist', 'isSelectLoading');
    this.playlistDetail$ = this.store.select('playlist', 'playlist');
    this.currentUser$ = this.store.select('auth', 'currentUser');

    this.subscriptions.push(
      this.currentUser$.subscribe(
        (user) => {
          if (user.id) {
            this.userId = user.id;
          }
        }
      ),

      // this.route.params.subscribe(params => {
      //   this.playlistId = params['id'];
      //   if (this.playlistId === 'popular') {
      //     this.playlistName = 'popular';
      //     this.store.dispatch(trackActions.getPopularTracks());
      //     this.tracks$ = this.store.select(state => state.track.popularTracks);
      //   } else if (this.playlistId === 'new-released') {
      //     this.playlistName = 'new released';
      //     this.store.dispatch(trackActions.getNewReleasedTracks());
      //     this.tracks$ = this.store.select(state => state.track.newReleasedTracks);
      //   } else {
      //     this.store.dispatch(playlistActions.getPlaylistById({playlistId: this.playlistId}));
      //     this.playlistDetail$ = this.store.select('playlist', 'playlist');
      //     this.tracks$ = this.playlistDetail$.pipe(map(p => p?.tracks));
      //     this.playlistDetail$.subscribe(p => this.playlistName = p?.title || '');
      //   }
      //   this.totalMinutes$ = this.tracks$.pipe(
      //     map(tracks => {
      //       if (!tracks || tracks.length === 0) return '0 seconds';
      //
      //       const totalSeconds = tracks.reduce((sum, t) => {
      //         const duration = Number(t.duration);
      //         return sum + (isNaN(duration) ? 0 : Math.floor(duration));
      //       }, 0);
      //
      //       const hours = Math.floor(totalSeconds / 3600);
      //       const minutes = Math.floor((totalSeconds % 3600) / 60);
      //       const seconds = totalSeconds % 60;
      //
      //       if (hours > 0) {
      //         return `${hours} hour${hours > 1 ? 's' : ''} ${minutes} minute${minutes > 1 ? 's' : ''} ${seconds} second${seconds > 1 ? 's' : ''}`;
      //       } else if (minutes > 0) {
      //         return `${minutes} minute${minutes > 1 ? 's' : ''} ${seconds} second${seconds > 1 ? 's' : ''}`;
      //       } else {
      //         return `${seconds} second${seconds > 1 ? 's' : ''}`;
      //       }
      //     })
      //   );
      // })

      this.playlistDetail$.subscribe((playlist) => {
        this.playlistDetail = playlist;
        // this.playlistOwnerId = playlist.profile.id;
        // console.log('Playlist detail:', this.playlistOwnerId);
      }),

      this.isLoading$.subscribe((isLoading) => {
        this.isLoading = isLoading;
      })
    );

    this.route.params.subscribe((params) => {
      this.playlistId = params['id'];
      this.store.dispatch(
        playlistActions.getPlaylistById({playlistId: this.playlistId})
      );
    });

    this.tracks$ = combineLatest([
      this.playlistDetail$.pipe(map((p) => p?.tracks || [])),
      this.store.select((state) => state.favorite.playlist?.tracks || []),
    ]).pipe(
      map(([tracks, favoriteTracks]) =>
        tracks.map((track) => ({
          ...track,
          isFavorite: favoriteTracks.some((fav) => fav.id === track.id),
        }))
      )
    );

    this.totalMinutes$ = this.playlistDetail$.pipe(
      map((p) => p?.tracks),
      map((tracks) => {
        if (!tracks || tracks.length === 0) return '0 seconds';

        const totalSeconds = tracks.reduce((sum, t) => {
          const duration = Number(t.duration);
          return sum + (isNaN(duration) ? 0 : Math.floor(duration));
        }, 0);

        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        if (hours > 0) {
          return `${hours}h ${minutes}m ${seconds}s`;
        } else if (minutes > 0) {
          return `${minutes}m ${seconds}s`;
        } else {
          return `${seconds}s`;
        }
      })
    );
  }

  deletePlaylist() {
    console.log('Playlist ID to delete:', this.playlistId);
    if (!this.playlistId) return;

    this.store.dispatch(playlistActions.deletePlaylist({id: this.playlistId}));
    console.log('Dispatch deletePlaylist with ID:', this.playlistId);
    this.router.navigate(['/profile']);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
