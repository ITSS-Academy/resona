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


  subscriptions: Subscription[] = [];

  constructor(
    private trackService: TrackService,

    private store: Store<{
      auth: AuthState;
      track: TrackState;
      playlist: PlaylistState;
    }>,
    private router: Router
  ) {}

  ngOnInit() {
    this.currentUser$ = this.store.select('auth', 'currentUser');
    this.loading$ = this.store.select((state) => state.track.isLoading);
    this.error$ = this.store.select((state) => state.track.error);
    this.getPlaylists$ = this.store.select('playlist', 'playlists');
    this.favoriteTracks$ = this.store.select('track', 'favoriteTracks');

    this.subscriptions.push(
      this.currentUser$.subscribe((user) => {
        this.currentUser = user;
        console.log('Current user:', user);

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


        }
      }),
      this.getPlaylists$.subscribe((playlists) => {
        this.playlist = playlists;
        console.log(this.playlist);
      }),
      this.favoriteTracks$.subscribe((tracks: TrackModel[]) => {
        this.favoriteTracks = tracks;
        console.log('Favorite tracks:', tracks);
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
