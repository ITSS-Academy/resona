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



  on(playlistActions.getPlaylists, (state, {type}) => {
    console.log(type)
    return {
      ...state,
      isLoading: true,
      error: null,
    };
  }),

  on(playlistActions.getPlaylistsSuccess, (state, {type, playlists}) => {
    console.log(type)
    return {
      ...state,
      playlists: playlists,
      isLoading: false,
      error: null,
    };
  }),
  on(playlistActions.getPlaylistsFailure, (state, {type, error}) => {
    console.log(type)
    return {
      ...state,
      isLoading: false,
      error: error,
    };
  }),



  on(playlistActions.getPlaylistById, (state, {type}) => {
    console.log(type)
    return {
      ...state,
      isLoading: true,
      error: null,
    };
  }),

  on(playlistActions.getPlaylistByIdSuccess, (state, {type, playlist}) => {
    console.log(type)
    return {
      ...state,
      playlist: playlist,
      isLoading: false,
      error: null,
    };
  }),
  on(playlistActions.getPlaylistByIdFailure, (state, {type, error}) => {
    console.log(type)
    return {
      ...state,
      isLoading: false,
      error: error,
    };
  }),
)

