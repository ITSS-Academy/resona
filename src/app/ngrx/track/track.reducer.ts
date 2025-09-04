import {TrackState} from './track.state';
import * as trackActions from './track.action';
import {createReducer, on} from '@ngrx/store';
import {TrackModel} from '../../models/track.model';

export const initialState: TrackState = {
  tracks: <TrackModel[]>[],
  trackDetail: <TrackModel>{},
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

  on(trackActions.getTrackById, (state, {type, id})=>{
    console.log(type);
    return {
      ...state,
      isLoading: true,
      error: null,
    }
  }),

  on(trackActions.getTrackByIdSuccess, (state, {type, trackDetail})=>{
    console.log(type,trackDetail);
    return {
      ...state,
      isLoading: false,
      trackDetail: trackDetail,
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
);
