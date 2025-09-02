import {createReducer, on} from '@ngrx/store';
import * as playlistActions from './playlist.action';
import {PlaylistModel} from '../../models/playlist.model';

export const initialState = {
  playlists: <PlaylistModel[]>[],
  playlist: <PlaylistModel>{},
  isLoading: false,
  error: null,
}

export const playlistReducer = createReducer(
  initialState,

  on(playlistActions.createPlaylist, (state, {type}) => {
    console.log(type)
    return {
      ...state,
      isLoading: true,
      error: null,
    };
  }),
  on(playlistActions.createPlaylistSuccess, (state, {type, playlist}) => {
    console.log(type)
    return {
      ...state,
      playlistList: [...state.playlists, playlist],
      isLoading: false,
      error: null,
    };
  }),
  on(playlistActions.createPlaylistFailure, (state, {type, error}) => {
    console.log(type)
    return {
      ...state,
      isLoading: false,
      error: error,
    };
  }),
)
