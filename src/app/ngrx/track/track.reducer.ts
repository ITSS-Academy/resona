import {TrackState} from './track.state';
import * as trackActions from './track.action';
import {createReducer, on} from '@ngrx/store';
import {TrackModel} from '../../models/track.model';


export const initialState: TrackState = {
  tracks: <TrackModel[]>[],
  favoriteTracks: <TrackModel[]>[],
  trackDetails: <TrackModel>{},
  thumbnailUrl: '',
  lyrics: '',
  isLoading: false,
  error: null,
}

export const trackReducer = createReducer(
  initialState,
  on(
    trackActions.uploadTrack, (state, {type}) => {
      console.log(type)
      return {
        ...state,
        isLoading: true,
        error: null,
      }
    }
  ),
  on(
    trackActions.uploadTrackSuccess, (state, {type}) => {
      console.log(type)
      return {
        ...state,
        isLoading: false,
        error: null,
      }
    }
  ),
  on(
    trackActions.uploadTrackFailure, (state, {error}) => {
      console.error(error);
      return {
        ...state,
        isLoading: false,
        error: error,
      }
    }
  ),

  on(
    trackActions.getFavoriteTracks, (state, {type}) => {
      console.log(type)
      return {
        ...state,
        isLoading: true,
        error: null,
      }
    }
  ),

  on(
    trackActions.getFavoriteTracksSuccess, (state, {type, tracks}) => {
    console.log(type)
    return {
      ...state,
      favoriteTracks: tracks,
      isLoading: false,
      error: null,
    }
  }
  ),
  on(
    trackActions.getFavoriteTracksFailure, (state, {error}) => {
      console.error(error);
      return {
        ...state,
        isLoading: false,
        error: error,
      }
    }
  ),

  on(trackActions.getTrackById, (state, {type, id})=>{
    console.log(type);
    return {
      ...state,
      isLoading: true,
      error: null,
    }
  }),

  on(trackActions.getTrackByIdSuccess, (state, {type, trackDetail})=>{
    console.log(type);
    return {
      ...state,
      isLoading: false,
      trackDetails: trackDetail,
      error: null,
    }
  }),

  on(trackActions.getTrackByIdFailure, (state, {type, error})=>{
    console.error(type);
    return {
      ...state,
      isLoading: false,
      error: error,
    }
  }),

  on(trackActions.getThumbnailBasedOnTrackId, (state, {type,id})=>{
    console.log(type);
    return {
      ...state,
      isLoading: true,
      error: null,
    }
  }),

  on(trackActions.getThumbnailBasedOnTrackIdSuccess, (state, {type,thumbnailUrl})=>{
    console.log(type);
    return {
      ...state,
      isLoading: false,
      thumbnailUrl: thumbnailUrl,
      error: null,
    }
  }),

  on(trackActions.getThumbnailBasedOnTrackIdFailure, (state, {type, error})=>{
    console.error(type);
    return {
      ...state,
      isLoading: false,
      error: error,
    }
  }),

  on(trackActions.getLyricsByTrackId, (state, {type,id})=>{
    console.log(type);
    return {
      ...state,
      isLoading: true,
      error: null,
    }
  }),

  on(trackActions.getLyricsByTrackIdSuccess, (state, {type,lyrics})=>{
    console.log(type);
    return {
      ...state,
      isLoading: false,
      lyrics: lyrics,
      error: null,
    }
  }),

  on(trackActions.getLyricsByTrackIdFailure, (state, {type, error})=>{
    console.error(type);
    return {
      ...state,
      isLoading: false,
      error: error,
    }
  }),

  on(trackActions.getTrackByCategoryId, (state, {type, categoryId})=>{
    console.log(type);
    return {
      ...state,
      isLoading: true,
      error: null,
    }
  }),

  on(trackActions.getTrackByCategoryIdSuccess, (state, {type, tracks})=>{
    console.log(type);
    return {
      ...state,
      isLoading: false,
      tracks: tracks,
      error: null,
    }
  }),

  on(trackActions.getTrackByCategoryIdFailure, (state, {type, error})=>{
    console.error(type);
    return {
      ...state,
      isLoading: false,
      error: error,
    }
  }),


  on(
    trackActions.incrementTrackPlayCount, (state, {type}) => {
      console.log(type)
      return {
        ...state,
        isLoading: true,
        error: null,
      }
    }
  ),
  on(trackActions.incrementTrackPlayCountSuccess, (state, {type, trackId}) => {
    console.log(type, trackId);
    return {
      ...state,
      isLoading: false,
      tracks: state.tracks.map((track) =>
        track.id === trackId
          ? {...track, viewCount: track.viewCount + 1}
          : track
      ),
    }
  }),
  on(
    trackActions.incrementTrackPlayCountFailure, (state, {type, error}) => {
      console.log(type);
      return {
        ...state,
        isLoading: false,
        error: error,
      }
    }
  ),


  on(trackActions.getTrackByOwnerId, (state, {type})=>{
    console.log(type);
    return {
      ...state,
      isLoading: true,
      error: null,
    }
  }),

  on(trackActions.getTrackByOwnerIdSuccess, (state, {type, tracks})=>{
    console.log(type);
    return {
      ...state,
      isLoading: false,
      tracks: tracks,
      error: null,
    }
  }),

  on(trackActions.getTrackByOwnerIdFailure, (state, {type, error})=>{
    console.error(type);
    return {
      ...state,
      isLoading: false,
      error: error,
    }
  })
);
