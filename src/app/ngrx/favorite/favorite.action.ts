import {createAction, props} from '@ngrx/store';

export const addToFavorite = createAction(
  '[Favorite] Add To Favorite',
  props<{ songId: string }>()
);

export const addToFavoriteSuccess = createAction(
  '[Favorite] Add To Favorite Success'
);

export const addToFavoriteFailure = createAction(
  '[Favorite] Add To Favorite Failure',
  props<{ error: any }>()
);
