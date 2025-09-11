import {Component} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

import {MaterialModule} from '../../shared/modules/material.module';
import {CategoryComponent} from '../category/category.component';

import {CategoryModel} from '../../models/category.model';
import {TrackModel} from '../../models/track.model';
import {PlaylistModel} from '../../models/playlist.model';
import {ProfileModel} from '../../models/profile.model';

import {SearchState} from '../../ngrx/search/search.state';
import {ImgConverterPipe} from '../../shared/pipes/img-converter.pipe';
import {Router} from '@angular/router';
import {PlayState} from "../../ngrx/play/play.state";
import * as PlayActions from "../../ngrx/play/play.action";

@Component({
  selector: 'app-search',
  imports: [
    MaterialModule,
    CategoryComponent,
    AsyncPipe,
    ImgConverterPipe
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  categories$!: Observable<CategoryModel[]>;
  tracks$!: Observable<TrackModel[]>;
  playlists$!: Observable<PlaylistModel[]>;
  profiles$!: Observable<ProfileModel[]>;

  hasTracks: boolean = true;

  constructor(
    private router: Router,
    private store: Store<{
      search: SearchState,
      play: PlayState
    }>)
  {
    this.categories$ = this.store.select(state => state.search.searchCategories);
    this.tracks$ = this.store.select(state => state.search.searchTracks);
    this.playlists$ = this.store.select(state => state.search.searchPlaylists);
    this.profiles$ = this.store.select(state => state.search.searchProfiles);

    this.tracks$.subscribe(tracks => {
      this.hasTracks = tracks && tracks.length > 0;
    });
  }

  navigateToCategoryDetail(id: string) {
    this.router.navigate(['/category-detail', id]).then();
  }

  onPlayTrack(track: TrackModel) {
    this.store.dispatch(PlayActions.setTrack({track}));
  }

  navigateToPlaylistDetail(id: string) {
    this.router.navigate(['/playlist-detail', id]).then();
  }

  navigateToProfile(id: string | undefined) {
    if (id) {
      this.router.navigate(['/profile', id]).then();
    }
  }
}
