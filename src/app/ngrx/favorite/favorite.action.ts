import { createAction, props } from '@ngrx/store';
import { PlaylistModel } from '../../models/playlist.model';

export const getFavoritePlaylist = createAction(
  '[Favorite] Get Favorite Playlist',
  props<{ userId: string }>(),
);

export const getFavoritePlaylistSuccess = createAction(
  '[Favorite] Get Favorite Playlist Success',
  props<{ playlist: PlaylistModel }>(),
);

export const getFavoritePlaylistFailure = createAction(
  '[Favorite] Get Favorite Playlist Failure',
  props<{ error: any }>(),
);

export const addToFavorite = createAction(
    '[Favorite] Add To Favorite',
    props<{ userId: string, songId: string }>()
);

export const addToFavoriteSuccess = createAction(
    '[Favorite] Add To Favorite Success'
);

export const addToFavoriteFailure = createAction(
    '[Favorite] Add To Favorite Failure',
    props<{ error: any }>()
);
