import {createAction, props} from '@ngrx/store';
import {PlaylistModel} from '../../models/playlist.model';

export const createPlaylist = createAction(
  '[Playlist] Create Playlist',
  props<{ title: string, description: string, thumbnail: File, userId: string }>()
);

export const createPlaylistSuccess = createAction(
  '[Playlist] Create Playlist Success',
  props<{ playlist: PlaylistModel }>()
)

export const createPlaylistFailure = createAction(
  '[Playlist] Create Playlist Failure',
  props<{ error: any }>()
);



export const getPlaylists = createAction('[Playlist] Get Playlists',
  props<{ userId: string }>()
);

export const getPlaylistsSuccess = createAction('[Playlist] Get Playlists Success',
  props<{ playlists: PlaylistModel[] }>()
);

export const getPlaylistsFailure = createAction('[Playlist] Get Playlists Failure',
  props<{ error: any }>()
);


export const getPlaylistById = createAction('[Playlist] Get Playlists By Id',
  props<{ playlistId: string }>()
);

export const getPlaylistByIdSuccess = createAction('[Playlist] Get Playlists By Id Success',
  props<{ playlist: PlaylistModel }>()
);

export const getPlaylistByIdFailure = createAction('[Playlist] Get Playlists By Id Failure',
  props<{ error: any }>()
);



export const addTrackToPlaylist = createAction(
  '[Playlist] Add Track To Playlist',
  props<{ playlistId: string, trackId: string }>()
);

export const addTrackToPlaylistSuccess = createAction(
  '[Playlist] Add Track To Playlist Success',
  props<{ playlist: PlaylistModel }>()
);

export const addTrackToPlaylistFailure = createAction(
  '[Playlist] Add Track To Playlist Failure',
  props<{ error: any }>()
);


export const deletePlaylist = createAction(
  '[Playlist] Delete Playlist',
  props<{ id: string }>()
);

export const deletePlaylistSuccess = createAction(
  '[Playlist] Delete Playlist Success',
  props<{ id: string }>()
);

export const deletePlaylistFailure = createAction(
  '[Playlist] Delete Playlist Failure',
  props<{ error: any }>()
);


export const removeTrackFromPlaylist = createAction(
  '[Playlist] Remove Track From Playlist',
  props<{ playlistId: string, trackId: string }>()
);

export const removeTrackFromPlaylistSuccess = createAction(
  '[Playlist] Remove Track From Playlist Success',
  props<{ playlist: PlaylistModel }>()
);

export const removeTrackFromPlaylistFailure = createAction(
  '[Playlist] Remove Track From Playlist Failure',
  props<{ error: any }>()
);
