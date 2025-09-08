import {createReducer, on} from '@ngrx/store';
import * as FavoriteActions from './favorite.action';
import {initialFavoriteState} from './favorite.state';

export const favoriteReducer = createReducer(
  initialFavoriteState,
  on(FavoriteActions.addToFavorite, (state) => ({
    ...state,
    loading: true,
    error: null,
    success: false,
  })),
  on(FavoriteActions.addToFavoriteSuccess, (state) => ({
    ...state,
    loading: false,
    success: true,
  })),
  on(FavoriteActions.addToFavoriteFailure, (state, {error}) => ({
    ...state,
    loading: false,
    error,
    success: false,
  }))
);
