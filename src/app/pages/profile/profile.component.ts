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
import * as playlistActions from '../../ngrx/playlist/playlist.action';
import { AsyncPipe, CommonModule } from '@angular/common';
import { AuthState } from '../../ngrx/auth/auth.state';
import { ProfileModel } from '../../models/profile.model';
import { ActivatedRoute, Router } from '@angular/router';
import * as trackActions from '../../ngrx/track/track.action';
import {MatIconModule} from '@angular/material/icon';
import {loadHistory} from '../../ngrx/history/history.action';
import {HistoryState} from '../../ngrx/history/history.state';
import {ImgConverterPipe} from '../../shared/pipes/img-converter.pipe';
import {LoginRequiredDialogComponent} from '../../components/login-required-dialog/login-required-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {MaterialModule} from '../../shared/modules/material.module';
import {ProfileState} from "../../ngrx/profile/profile.state";
import * as ProfileActions from "../../ngrx/profile/profile.actions";
import {HistoryModel} from "../../models/history.model";

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
  viewedProfile$!: Observable<ProfileModel | null>;
  isViewingOwnProfile: boolean = true;

  uploadedTracks$!: Observable<TrackModel[]>;
  uploadedTracks: TrackModel[] = [];
  playlists: PlaylistModel[] = [];
  favoriteTracks: TrackModel[] = [];
  historyTracks$!: Observable<HistoryModel[]>;

  subscriptions: Subscription[] = [];

  constructor(
    private trackService: TrackService,
    private store: Store<{
      auth: AuthState;
      track: TrackState;
      playlist: PlaylistState;
      history: HistoryState;
      profile: ProfileState;
    }>,
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.route.params.subscribe(params => {
        const userId = params['id'];
        if (userId) {
          this.isViewingOwnProfile = false;
          this.store.dispatch(ProfileActions.getProfileById({ userId }));
          this.viewedProfile$ = this.store.select(state => state.profile.profile);

          this.subscriptions.push(
            this.viewedProfile$.subscribe(profile => {
              if (profile) {
                this.loadProfileData(profile.uid);
              }
            })
          );
        } else {
          this.isViewingOwnProfile = true;
          this.currentUser$ = this.store.select(state => state.auth.currentUser);
          this.subscriptions.push(
            this.currentUser$.subscribe(user => {
              if (user) {
                this.loadProfileData(user.uid);
                this.uploadedTracks$ = this.trackService.getTracksByOwnerId(user.uid);

                this.uploadedTracks$.subscribe((tracks: TrackModel[]) => {
                  this.uploadedTracks = tracks;
                  console.log('Uploaded tracks:', tracks);
                });

                this.store.dispatch(
                  playlistActions.getPlaylists({ userId: user.uid })
                );
              }

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
            })
          );
        }
      })
    );

    this.historyTracks$ = this.store.select((state) => state.history.history);
    this.subscriptions.push(
      this.store.select('playlist', 'playlists').subscribe((playlists) => {
        this.playlists = playlists;
      }),
      this.store.select('track', 'favoriteTracks').subscribe((tracks: TrackModel[]) => {
        this.favoriteTracks = tracks;
      }),
      this.store.select('track', 'tracks').subscribe((tracks: TrackModel[]) => {
        this.uploadedTracks = tracks;
      })
    );
  }

  loadProfileData(userId: string) {
    this.trackService.getTracksByOwnerId(userId).subscribe((tracks: TrackModel[]) => {
      this.uploadedTracks = tracks;
    });
    this.store.dispatch(playlistActions.getPlaylists({ userId }));
    this.store.dispatch(trackActions.getFavoriteTracks({ userId }));
    this.store.dispatch(trackActions.getTrackByOwnerId({ ownerId: userId }));
    this.store.dispatch(loadHistory({ userId }));
  }

  navigateToPlaylistDetail(playlistId: string) {
    this.router.navigate(['/playlist-detail', playlistId]);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
