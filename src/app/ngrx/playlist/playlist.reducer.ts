import {createReducer, on} from '@ngrx/store';
import * as playlistActions from './playlist.action';
import {PlaylistModel, PopularPlaylistModel} from '../../models/playlist.model';

export const initialState = {
  playlists: <PlaylistModel[]>[],
  playlist: <PlaylistModel>{},
  popular: <PopularPlaylistModel[]>[],
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
      playlists: [...state.playlists, playlist], // correct property name
      playlist: playlist,
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


  on(playlistActions.addTrackToPlaylist, (state, {type}) => {
    console.log(type)
    return {
      ...state,
      isLoading: true,
      error: null,
    };
  }),

  on(playlistActions.addTrackToPlaylistSuccess, (state, {type, playlist}) => {
    console.log(type)
    return {
      ...state,
      playlist: {
        ...state.playlist,
        // merge các thuộc tính mới từ backend (nếu có)
        ...playlist,
        // tracks hiện tại + track mới (nếu backend chỉ trả về playlist có 1 track)
        tracks: [
          ...(state.playlist?.tracks ?? []),
          ...(playlist.tracks ?? [])
        ]
      },
      isLoading: false,
      error: null,
    };
  }),
  on(playlistActions.addTrackToPlaylistFailure, (state, {type, error}) => {
    console.log(type)
    return {
      ...state,
      isLoading: false,
      error: error,
    };
  }),


  on(playlistActions.deletePlaylist, (state, {type}) => {
    console.log(type)
    return {
      ...state,
      isLoading: true,
      error: null,
    };
  }),
  on(playlistActions.deletePlaylistSuccess, (state, {type, id}) => {
    console.log(type)
    return {
      ...state,
      playlists: state.playlists.filter(playlist => playlist.id !== id),
      isLoading: false,
      error: null,
    };
  }),
  on(playlistActions.deletePlaylistFailure, (state, {type, error}) => {
    console.log(type)
    return {
      ...state,
      isLoading: false,
      error: error,
    };
  }),


  on(playlistActions.removeTrackFromPlaylist, (state, {type}) => {
    console.log(type)
    return {
      ...state,
      isLoading: true,
      error: null,
    };
  }),
  on(playlistActions.removeTrackFromPlaylistSuccess, (state, {type, playlist}) => {
    console.log(type)
    return {
      ...state,
      playlist: playlist,
      isLoading: false,
      error: null,
    };
  }),
  on(playlistActions.removeTrackFromPlaylistFailure, (state, {type, error}) => {
    console.log(type)
    return {
      ...state,
      isLoading: false,
      error: error,
    };
  }),
  on(playlistActions.getPopularPlaylists, (state, {type}) => {
    console.log(type)
    return {
      ...state,
      isLoading: true,
      error: null,
    }
  }),
  on(playlistActions.getPopularPlaylistsSuccess, (state, {type, popular}) => {
    console.log(type)
    return {
      ...state,
      popular: popular,
      isLoading: false,
      error: null,
    }
  }),
  on(playlistActions.getPopularPlaylistsFailure, (state, {type, error}) => {
    console.log(type)
    return {
      ...state,
      isLoading: false,
      error: error,
    }
  }),
)

