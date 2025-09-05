import {TrackState} from './track.state';
import * as trackActions from './track.action';
import {createReducer, on} from '@ngrx/store';
import {TrackModel} from '../../models/track.model';


export const initialState: TrackState = {
  tracks: <TrackModel[]>[],
  favoriteTracks: [],
  trackDetails: <TrackModel>{},
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



  on(trackActions.getFavoriteTracks, (state, {type}) => {
    console.log(type)
    return {
      ...state,
      isLoading: true,
      error: null,
    };
  }),

  on(trackActions.getFavoriteTracksSuccess, (state, {type, tracks}) => {
    console.log(type)
    return {
      ...state,
      favoriteTracks: tracks,
      isLoading: false,
      error: null,
    };
  }),

  on(trackActions.getFavoriteTracksFailure, (state, {type, error}) => {
    console.log(type)
    return {
      ...state,
      isLoading: false,
      error: error,
    };
  })



);
