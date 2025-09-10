import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTab, MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import {
  MatList,
  MatListItem,
} from '@angular/material/list';
import { MatButton, MatIconButton } from '@angular/material/button';
import { TrackService } from '../../services/track/track.service';
import { TrackModel } from '../../models/track.model';
import {Observable, Subscription, take} from 'rxjs';
import { Store } from '@ngrx/store';
import { MusicTabComponent } from '../../components/music-tab/music-tab.component';
import { TrackState } from '../../ngrx/track/track.state';
import { PlaylistModel } from '../../models/playlist.model';
import { PlaylistState } from '../../ngrx/playlist/playlist.state';
import * as categoryActions from '../../ngrx/category/category.action';
import * as playlistActions from '../../ngrx/playlist/playlist.action';
import { CategoryModel } from '../../models/category.model';
import { AsyncPipe, CommonModule } from '@angular/common';
import { play } from '../../ngrx/play/play.action';
import { AuthState } from '../../ngrx/auth/auth.state';
import { ProfileModel } from '../../models/profile.model';
import { Router } from '@angular/router';
import * as trackActions from '../../ngrx/track/track.action';
import {MatIconModule} from '@angular/material/icon';
import * as historyActions from '../../ngrx/history/history.action';
import { HistoryModel } from '../../models/history.model';
import {loadHistory} from '../../ngrx/history/history.action';
import {HistoryState} from '../../ngrx/history/history.state';
import {ImgConverterPipe} from '../../shared/pipes/img-converter.pipe';
import {LoginRequiredDialogComponent} from '../../components/login-required-dialog/login-required-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {MaterialModule} from '../../shared/modules/material.module';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  imports: [
    CommonModule,
    MatTabGroup,
    MatTab,
    MatTabsModule,
    MatList,
    MatListItem,
    MatButton,
    MusicTabComponent,
    MatIconModule,
    ImgConverterPipe,
    MaterialModule
  ],
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  currentUser$!: Observable<ProfileModel>;
  currentUser!: ProfileModel;
  uploadedTracks$!: Observable<TrackModel[]>;
  uploadedTracks: TrackModel[] = [];

  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;
  getPlaylists$!: Observable<PlaylistModel[]>;
  playlist: PlaylistModel[] = [];
  favoriteTracks$!: Observable<TrackModel[]>;
  favoriteTracks: TrackModel[] = [];
  historyTracks$!: Observable<HistoryModel[]>;

  getTracksByOwnerId$!: Observable<TrackModel[]>;


  subscriptions: Subscription[] = [];

  constructor(
    private trackService: TrackService,

    private store: Store<{
      auth: AuthState;
      track: TrackState;
      playlist: PlaylistState;
      history: HistoryState;
    }>,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.currentUser$ = this.store.select('auth', 'currentUser');
    this.loading$ = this.store.select((state) => state.track.isLoading);
    this.error$ = this.store.select((state) => state.track.error);
    this.getPlaylists$ = this.store.select('playlist', 'playlists');
    this.favoriteTracks$ = this.store.select('track', 'favoriteTracks');
    this.getTracksByOwnerId$ = this.store.select('track', 'tracks');
    this.historyTracks$ = this.store.select((state) => state.history.history);

    this.subscriptions.push(
      this.currentUser$.subscribe((user) => {
        this.currentUser = user;
        console.log('Current user:', user);

        if (!user || !user.uid) {
          // 🚨 chưa đăng nhập → show dialog
          const dialogRef = this.dialog.open(LoginRequiredDialogComponent, {
            width: '500px',
            height: '200px',
            disableClose: true // bắt buộc chọn Cancel hoặc Login
          });

          dialogRef.afterClosed().subscribe(() => {
            // kiểm tra lại user
            this.store.select('auth', 'currentUser').pipe(take(1)).subscribe(u => {
              if (!u || !u.uid) {
                // nếu vẫn chưa login → điều hướng ra Home
                this.router.navigate(['/']);
              }
            });
          });
          return;
        }

        if (user.uid) {
          this.uploadedTracks$ = this.trackService.getTracksByOwnerId(user.uid);

          this.uploadedTracks$.subscribe((tracks: TrackModel[]) => {
            this.uploadedTracks = tracks;
            console.log('Uploaded tracks:', tracks);
          });

          this.store.dispatch(
            playlistActions.getPlaylists({ userId: user.uid })
          );
          this.store.dispatch(
            trackActions.getFavoriteTracks({ userId: user.uid })
          );
          this.store.dispatch(
            trackActions.getTrackByOwnerId({ ownerId: user.uid })
          );
          this.store.dispatch(
            loadHistory({ userId: user.uid })
          );

        }
      }),
      this.getPlaylists$.subscribe((playlists) => {
        this.playlist = playlists;
        console.log(this.playlist);
      }),
      this.favoriteTracks$.subscribe((tracks: TrackModel[]) => {
        this.favoriteTracks = tracks;
        console.log('Favorite tracks:', tracks);
      }),
      this.getTracksByOwnerId$.subscribe((tracks: TrackModel[]) => {
        this.uploadedTracks = tracks;
        console.log('Uploaded tracks from store:', tracks);
      }),

      this.historyTracks$.subscribe((history) => {
        console.log('History tracks:', history);
      })
    );
  }

  navigateToPlaylistDetail(playlistId: string) {
    this.router.navigate(['/playlist-detail', playlistId]);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
