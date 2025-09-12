import { createReducer, on } from '@ngrx/store';
import { SearchState } from './search.state';
import * as searchActions from './search.actions';

export const initialSearchState: SearchState = {
  tracks: [],
  playlists: [],
  profiles: [],
  categories: [],
  loading: false,
  error: null,
};

export const searchReducer = createReducer(
  initialSearchState,

  // Loading state for all search actions
  on(
    searchActions.searchCategories,
    searchActions.searchProfiles,
    searchActions.searchPlaylists,
    searchActions.searchTracks,
    state => ({
      ...state,
      loading: true,
    })
  ),

  // Success actions
  on(searchActions.searchCategoriesSuccess, (state, { categories }) => ({
    ...state,
    categories,
    loading: false,
  })),
  on(searchActions.searchProfilesSuccess, (state, { profiles }) => ({
    ...state,
    profiles,
    loading: false,
  })),
  on(searchActions.searchPlaylistsSuccess, (state, { playlists }) => ({
    ...state,
    playlists,
    loading: false,
  })),
  on(searchActions.searchTracksSuccess, (state, { tracks }) => ({
    ...state,
    tracks,
    loading: false,
  })),

  // Failure actions
  on(
    searchActions.searchCategoriesFailure,
    searchActions.searchProfilesFailure,
    searchActions.searchPlaylistsFailure,
    searchActions.searchTracksFailure,
    (state, { error }) => ({
      ...state,
      error,
      loading: false,
    })
  )
);
