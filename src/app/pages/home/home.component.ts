import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {TrackModel} from '../../models/track.model';
import * as PlayActions from '../../ngrx/play/play.action';
import {MoodPlaylistModel} from '../../models/moodPlaylist.model';
import {PopularArtistModel} from '../../models/popularArtist.model';
import {MoodPlaylistService} from '../../services/mood-playlist/mood-playlist.service';
import {NewReleaseSongsService} from '../../services/new-release-songs/new-release-songs.service';
import {PopularArtistService} from '../../services/popular-artist/popular-artist.service';
import {PlayState} from '../../ngrx/play/play.state';
import {MusicTabComponent} from '../../components/music-tab/music-tab.component';
import {CategoryState} from '../../ngrx/category/category.state';
import {CategoryModel} from '../../models/category.model';
import * as CategoryActions from '../../ngrx/category/category.action';
import * as ProfileActions from '../../ngrx/profile/profile.actions';
import * as PlaylistActions from '../../ngrx/playlist/playlist.action';
import {ProfileState} from '../../ngrx/profile/profile.state';
import {PlaylistModel, PopularPlaylistModel} from '../../models/playlist.model';
import {PlaylistState} from '../../ngrx/playlist/playlist.state';
import {ProfileModel} from '../../models/profile.model';
import {MaterialModule} from '../../shared/modules/material.module';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatIconModule, MusicTabComponent, AsyncPipe, MaterialModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  moodPlaylists: MoodPlaylistModel[] = [];
  newReleaseTracks: TrackModel[] = [];
  popularArtists: PopularArtistModel[] = [];
  popularProfiles$!: Observable<ProfileModel[]>;
  popularProfiles: ProfileModel[] = [];
  popularPlaylists$!: Observable<PopularPlaylistModel[]>;
  popularPlaylists: PopularPlaylistModel[] = [];
  subscriptions: Subscription[] = [];
  isLoading = false;
  isCategoriesLoading$!: Observable<boolean>;
  isProfilesLoading$!: Observable<boolean>;
  isPlaylistsLoading$!: Observable<boolean>

  categories$: Observable<CategoryModel[]>;

  constructor(
    private moodPlaylistService: MoodPlaylistService,
    private newReleasesService: NewReleaseSongsService,
    private popularArtistService: PopularArtistService,
    private store: Store<{
      category: CategoryState;
      play: PlayState;
      profile: ProfileState;
      playlist: PlaylistState;
    }>,
    private router: Router
  ) {
    this.store.dispatch(CategoryActions.getAllCategories());
    this.categories$ = this.store.select(
      (state) => state.category.categoryList
    );
    this.moodPlaylists = this.moodPlaylistService.playlists;
    this.popularArtists = this.popularArtistService.artists;
  }

  ngOnInit() {
    this.popularProfiles$ = this.store.select('profile', 'profileList')
    this.popularPlaylists$ = this.store.select('playlist', 'popular')
    this.isCategoriesLoading$ = this.store.select('category', 'isLoading');
    this.isProfilesLoading$ = this.store.select('profile', 'isLoading');
    this.isPlaylistsLoading$ = this.store.select('playlist', 'isLoading');

    // if (this.isCategoriesLoading$ || this.isProfilesLoading$ || this.isPlaylistsLoading$) {
    //   this.isLoading = true;
    //   if (this.isProfilesLoading$) {
    //     console.log('Loading profiles...');
    //   } else if (this.isPlaylistsLoading$) {
    //     console.log('Loading playlists...');
    //   } else if (this.isPlaylistsLoading$) {
    //     console.log('Loading categories...');
    //   }
    // } else {
    //   this.isLoading = false;
    // }

    this.subscriptions.push(
      this.popularProfiles$.subscribe((profiles: ProfileModel[]) => {
        this.popularProfiles = profiles;
        console.log(this.popularProfiles);
      }),
      this.popularPlaylists$.subscribe((playlists: PopularPlaylistModel[]) => {
        this.popularPlaylists = playlists;
        console.log('Popularrrrrrr', this.popularPlaylists);
      })
    )

    this.store.dispatch(ProfileActions.getPopularProfiles());
    this.store.dispatch(PlaylistActions.getPopularPlaylists());

    const newReleaseSub = this.newReleasesService
      .getNewReleasedTracks()
      .subscribe((tracks) => {
        this.newReleaseTracks = tracks.slice(0, 5);
      });
    // this.subscriptions.add(newReleaseSub);
  }

  onPlayTrack(track: TrackModel) {
    this.store.dispatch(PlayActions.setTrack({track}));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  navigateToPlaylistDetail(id: string) {
    this.router.navigate(['/playlist-detail', id]).then();
  }

  navigateToCategoryDetail(id: string) {
    this.router.navigate(['/category-detail', id]).then();
  }
}
