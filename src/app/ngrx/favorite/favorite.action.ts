import {createAction, props} from '@ngrx/store';

export const addToFavorite = createAction(
  '[Favorite] Add To Favorite',
  props<{ userId: string; songId: string }>()
);

export const addToFavoriteSuccess = createAction(
  '[Favorite] Add To Favorite Success'
);

export const addToFavoriteFailure = createAction(
  '[Favorite] Add To Favorite Failure',
);
