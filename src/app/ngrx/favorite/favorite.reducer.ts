import { createReducer, on } from '@ngrx/store';
import { initialFavoriteState } from './favorite.state';
import * as FavoriteActions from './favorite.action';

export const favoriteReducer = createReducer(
  initialFavoriteState,
  on(FavoriteActions.getFavoritePlaylist, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(FavoriteActions.getFavoritePlaylistSuccess, (state, { playlist }) => ({
    ...state,
    playlist: playlist,
    loading: false,
  })),
  on(FavoriteActions.getFavoritePlaylistFailure, (state, { error }) => ({
    ...state,
    error: error,
    loading: false,
  })),
  on(FavoriteActions.addToFavorite, (state) => ({
    ...state,
    loading: true,
  })),
  on(FavoriteActions.addToFavoriteSuccess, (state) => ({
    ...state,
    loading: false,
  })),
  on(FavoriteActions.addToFavoriteFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
