import {createAction, props} from '@ngrx/store';
import {PlaylistModel} from '../../models/playlist.model';

export const createPlaylist = createAction(
  '[Playlist] Create Playlist',
  props<{ title: string, description: string, file: File, userId: string }>()
);

export const createPlaylistSuccess = createAction(
  '[Playlist] Create Playlist Success',
  props<{ playlist: PlaylistModel }>()
)

export const createPlaylistFailure = createAction(
  '[Playlist] Create Playlist Failure',
  props<{ error: any }>()
);

