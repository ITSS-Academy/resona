// src/app/ngrx/search/search.reducer.ts
import {createReducer, on} from '@ngrx/store';
import * as SearchActions from './search.actions';
import {initialSearchState} from './search.state';

export const searchReducer = createReducer(
  initialSearchState,
  on(SearchActions.searchCategories, (state) => ({
    ...state,
    isLoading: true,
    error: null,
    searchCategories: [],
  })),
  on(SearchActions.searchCategoriesSuccess, (state, {categories}) => ({
    ...state,
    isLoading: false,
    searchCategories: categories,
  })),
  on(SearchActions.searchCategoriesFailure, (state, {error}) => ({
    ...state,
    isLoading: false,
    error,
  })),

  on(SearchActions.searchProfiles, (state) => ({
    ...state,
    isLoading: true,
    error: null,
    searchProfiles: [],
  })),
  on(SearchActions.searchProfilesSuccess, (state, {profiles}) => ({
    ...state,
    isLoading: false,
    searchProfiles: profiles,
  })),
  on(SearchActions.searchProfilesFailure, (state, {error}) => ({
    ...state,
    isLoading: false,
    error,
  })),

  on(SearchActions.searchPlaylists, (state) => ({
    ...state,
    isLoading: true,
    error: null,
    searchPlaylists: [],
  })),
  on(SearchActions.searchPlaylistsSuccess, (state, {playlists}) => ({
    ...state,
    isLoading: false,
    searchPlaylists: playlists,
  })),
  on(SearchActions.searchPlaylistsFailure, (state, {error}) => ({
    ...state,
    isLoading: false,
    error,
  })),

  on(SearchActions.searchTracks, (state) => ({
    ...state,
    isLoading: true,
    error: null,
    searchTracks: [],
  })),
  on(SearchActions.searchTracksSuccess, (state, {tracks}) => ({
    ...state,
    isLoading: false,
    searchTracks: tracks,
  })),
  on(SearchActions.searchTracksFailure, (state, {error}) => ({
    ...state,
    isLoading: false,
    error,
  })),
);
