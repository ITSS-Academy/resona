import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatTab, MatTabGroup, MatTabsModule} from '@angular/material/tabs';
import {
  MatList,
  MatListItem,
} from '@angular/material/list';
import {MatButton, MatIconButton} from '@angular/material/button';
import {TrackService} from '../../services/track/track.service';
import {TrackModel} from '../../models/track.model';
import {Observable, Subscription, take} from 'rxjs';
import {Store} from '@ngrx/store';
import {MusicTabComponent} from '../../components/music-tab/music-tab.component';
import {TrackState} from '../../ngrx/track/track.state';
import {PlaylistModel} from '../../models/playlist.model';
import {PlaylistState} from '../../ngrx/playlist/playlist.state';
import * as playlistActions from '../../ngrx/playlist/playlist.action';
import {AsyncPipe, CommonModule} from '@angular/common';
import {AuthState} from '../../ngrx/auth/auth.state';
import {ProfileModel} from '../../models/profile.model';
import {ActivatedRoute, Router} from '@angular/router';
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
import {FavoriteState} from '../../ngrx/favorite/favorite.state';
import * as FavoriteActions from '../../ngrx/favorite/favorite.action';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  imports: [
    CommonModule,
    MatTabGroup,
    MatTab,
    MatTabsModule,
    MatList,
    MatButton,
    MusicTabComponent,
    MatIconModule,
    MaterialModule
  ],
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  currentUser$!: Observable<ProfileModel>;
  currentUser!: ProfileModel;
  viewedProfile$!: Observable<ProfileModel>;
  viewedProfile!: ProfileModel;
  // viewedProfileId!: string;
  // isViewingOwnProfile: boolean = true;

  uploadedTracks$!: Observable<TrackModel[]>;
  uploadedTracks: TrackModel[] = []
  favoritePlaylist$!: Observable<PlaylistModel | null>;
  favoritePlaylist!: PlaylistModel | null;
  historyTracks$!: Observable<HistoryModel[]>;
  historyTracks: HistoryModel[] = [];
  playlists$!: Observable<PlaylistModel[]>;
  playlists!: PlaylistModel[];
  playlistDetailMap: Record<string, PlaylistModel | undefined> = {};

  subscriptions: Subscription[] = [];

  followers$!: Observable<ProfileModel[]>;
  followers!: ProfileModel[];

  constructor(
    private trackService: TrackService,
    private activatedRoute: ActivatedRoute,
    private store: Store<{
      auth: AuthState;
      track: TrackState;
      playlist: PlaylistState;
      history: HistoryState;
      profile: ProfileState;
      favorite: FavoriteState;
    }>,
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {
    let {id} = this.route.snapshot.params;
    console.log(id);
    this.store.dispatch(ProfileActions.getProfileById({userId: id}));
    this.store.dispatch(ProfileActions.getFollowers({profileId: id}));
    this.store.dispatch(playlistActions.getPlaylists({userId: id}));
    this.store.dispatch(FavoriteActions.getFavoritePlaylist({userId: id}));
    this.store.dispatch(trackActions.getTrackByOwnerId({ownerId: id}));
    this.store.dispatch(loadHistory({userId: id}));

    this.viewedProfile$ = this.store.select('profile', 'profile');
    this.currentUser$ = this.store.select('auth', 'currentUser');
    this.followers$ = this.store.select('profile','profileList');
    this.playlists$ = this.store.select('playlist', 'playlists');
    this.favoritePlaylist$ = this.store.select('favorite','playlist');
    this.uploadedTracks$ = this.store.select('track','tracks');
    this.historyTracks$ = this.store.select('history','history');

  }

  ngOnInit() {
    this.subscriptions.push(
      this.viewedProfile$.subscribe(profile => {
        if (profile.id) {
          this.viewedProfile = profile;
          console.log("ViewedProfile", this.viewedProfile);
        }
      }),
      this.followers$.subscribe(followers => {
        if (followers.length > 0) {
          this.followers = followers;
          console.log(this.followers);
        }
      }),
      this.playlists$.subscribe(playlist => {
        if (playlist.length > 0) {
          this.playlists = playlist;
          console.log(this.playlists);
        }
      }),
      this.favoritePlaylist$.subscribe(playlist => {
        if (playlist?.id) {
          this.favoritePlaylist = playlist;
          console.log(this.favoritePlaylist);
        }
      }),
      this.uploadedTracks$.subscribe(uploadedTracks => {
        if (uploadedTracks.length>0) {
          this.uploadedTracks = uploadedTracks;
          console.log(this.uploadedTracks);
        }
      }),
      this.historyTracks$.subscribe(historyTracks => {
        if (historyTracks.length>0) {
          this.historyTracks = historyTracks;
          console.log(this.historyTracks);
        }
      }),
      this.currentUser$.subscribe(user => {
        if (user.id) {
          this.currentUser = user;
        }
      }),
    )
  }

  getTrackCount(playlistId: string) {
    return this.playlistDetailMap[playlistId]?.tracks?.length || 0;
  }

  navigateToPlaylistDetail(playlistId: string) {
    this.router.navigate(['/playlist-detail', playlistId]).then();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  async followProfile() {
    console.log(this.currentUser.id);
    this.store.dispatch(ProfileActions.followProfile({
      followerId: this.currentUser.id,
      followingId: this.viewedProfile.id
    }));
    await new Promise(resolve => setTimeout(resolve, 500));
    this.store.dispatch(ProfileActions.getFollowers({profileId: this.viewedProfile.id}));
  }

  isFollowing(): boolean {
    if (!this.currentUser || !this.followers) return false;
    return this.followers.some(follower => follower.id === this.currentUser.id);
  }
}

