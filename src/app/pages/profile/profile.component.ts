import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTab, MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import {
  MatList,
  MatListItem,
} from '@angular/material/list';
import { MatButton, MatIconButton } from '@angular/material/button';
import { TrackService } from '../../services/track/track.service';
import { TrackModel } from '../../models/track.model';
import { Observable, Subscription } from 'rxjs';
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
import {ProfileState} from "../../ngrx/profile/profile.state";
import * as ProfileActions from "../../ngrx/profile/profile.actions";
import {HistoryModel} from "../../models/history.model";
import { FavoriteState } from '../../ngrx/favorite/favorite.state';
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
    MatListItem,
    MatButton,
    MusicTabComponent,
    MatIconModule,
    ImgConverterPipe,
  ],
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  currentUser$!: Observable<ProfileModel>;
  viewedProfile$!: Observable<ProfileModel | null>;
  isViewingOwnProfile: boolean = true;

  uploadedTracks: TrackModel[] = [];
  playlists: PlaylistModel[] = [];
  favoritePlaylist$!: Observable<PlaylistModel | null>;
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
      favorite: FavoriteState;
    }>,
    private router: Router,
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
              }
            })
          );
        }
      })
    );

    this.historyTracks$ = this.store.select((state) => state.history.history);
    this.favoritePlaylist$ = this.store.select(state => state.favorite.playlist);

    this.subscriptions.push(
      this.store.select('playlist', 'playlists').subscribe((playlists) => {
        this.playlists = playlists;
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
    this.store.dispatch(FavoriteActions.getFavoritePlaylist({ userId }));
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
