import {Component, ViewChild, ElementRef, AfterViewInit, Renderer2, OnDestroy, OnInit} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MusicGenresService} from '../../services/music-genres/music-genres.service';
import {MusicGenresModel} from '../../models/musicGenres.model';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {TrackModel} from '../../models/track.model';
import * as PlayActions from '../../ngrx/play/play.action';
import {ProfileModel} from '../../models/profile.model';
import {PlaylistModel} from '../../models/playlist.model';
import {MatIconButton} from '@angular/material/button';
import {MoodPlaylistModel} from '../../models/moodPlaylist.model';
import {NewReleaseSongModel} from '../../models/newReleaseSong.model';
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
  imports: [
    MatIconModule,
    MatIconButton,
    MusicTabComponent,
    AsyncPipe,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {

  moodPlaylists: MoodPlaylistModel[] = [];
  newReleases: NewReleaseSongModel[] = [];
  popularArtists: PopularArtistModel[] = [];

  categories$: Observable<CategoryModel[]>;

  constructor(
    private moodPlaylistService: MoodPlaylistService,
    private newReleasesService: NewReleaseSongsService,
    private popularArtistService: PopularArtistService,
    private renderer: Renderer2,
    private store: Store<{
      category: CategoryState,
      play: PlayState
    }>,
    private router: Router
  ) {
    // this.musicGenres = this.musicGenresService.categories;
    this.categories$ = this.store.select(state => state.category.categoryList);
    this.moodPlaylists = this.moodPlaylistService.playlists;
    this.newReleases = this.newReleasesService.songs;
    this.popularArtists = this.popularArtistService.artists;
  }

  private defaultProfile: ProfileModel = {
    uid: 'default',
    email: 'unknown@email.com',
    name: 'Unknown',
    photoURL: ''
  };

  private defaultGenre: MusicGenresModel = {
    id: 'default',
    name: 'Unknown',
    image: '',
    color: '#cccccc'
  };

  get newReleaseTracks(): TrackModel[] {
    return this.newReleases.map((song, idx) => ({
      id: `new-${idx}`,
      title: song.title,
      artistName: song.artist,
      thumbnailPath: song.imageUrl,
      filePath: '',
      viewCount: 0,
      createdAt: song.releaseDate,
      duration: this.parseDuration(song.duration),
      owner: this.defaultProfile,
      category: this.defaultGenre
    }));
  }

  // Helper function
  private parseDuration(duration: string): number {
    const [min, sec] = duration.split(':').map(Number);
    return min * 60 + sec;
  }
  // ----------------------------------------------------------------------------------------------------------------------
  ngOnInit() {
    this.store.dispatch(CategoryActions.getAllCategories());
  }

  onPlayTrack(track: TrackModel) {
    console.log('Playing track:', track);
    this.store.dispatch(PlayActions.play());
  }

  ngOnDestroy() {
  }

  navigateToCategoryDetail(id: string) {
    this.router.navigate(['/category-detail', id]).then();
  }
}
