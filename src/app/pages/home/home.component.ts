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

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatIconModule,
    MusicTabComponent,
    AsyncPipe,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {

  moodPlaylists: MoodPlaylistModel[] = [];
  newReleaseTracks: TrackModel[] = [];
  popularArtists: PopularArtistModel[] = [];
  private subscriptions = new Subscription();

  categories$: Observable<CategoryModel[]>;

  constructor(
    private moodPlaylistService: MoodPlaylistService,
    private newReleasesService: NewReleaseSongsService,
    private popularArtistService: PopularArtistService,
    private store: Store<{
      category: CategoryState,
      play: PlayState
    }>,
    private router: Router
  ) {
    this.store.dispatch(CategoryActions.getAllCategories());
    this.categories$ = this.store.select(state => state.category.categoryList);
    this.moodPlaylists = this.moodPlaylistService.playlists;
    this.popularArtists = this.popularArtistService.artists;
  }

  ngOnInit() {
    const newReleaseSub = this.newReleasesService.getNewReleasedTracks().subscribe(tracks => {
      this.newReleaseTracks = tracks.slice(0, 5);
    });
    this.subscriptions.add(newReleaseSub);
  }

  onPlayTrack(track: TrackModel) {
    this.store.dispatch(PlayActions.setTrack({track}));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  navigateToPlaylistDetail(id: string) {
    this.router.navigate(['/playlist-detail', id]).then();
  }

  navigateToCategoryDetail(id: string) {
    this.router.navigate(['/category-detail', id]).then();
  }
}