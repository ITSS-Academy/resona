import { createReducer, on } from '@ngrx/store';
import { FavoriteState } from './favorite.state';
import * as favoriteActions from './favorite.action';

export const initialFavoriteState: FavoriteState = {
  playlist: null,
  loading: false,
  error: null,
};

export const favoriteReducer = createReducer(
  initialFavoriteState,
  on(favoriteActions.getFavoritePlaylist, state => ({
    ...state,
    loading: true,
  })),
  on(favoriteActions.getFavoritePlaylistSuccess, (state, { playlist }) => ({
    ...state,
    playlist,
    loading: false,
  })),
  on(favoriteActions.getFavoritePlaylistFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
