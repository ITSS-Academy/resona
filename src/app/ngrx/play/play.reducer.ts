import {createReducer, on} from '@ngrx/store';
import * as playActions from './play.action';
import {TrackModel} from '../../models/track.model';

export const initialState = {
  currentTrack: <TrackModel>{},
  isPlaying: false,
}

export const playReducer = createReducer(
  initialState,
  on(playActions.setTrack, (state, {track}) => ({
    ...state,
    currentTrack: track,
    isPlaying: true, // auto play khi chọn track mới
  })),
  on(playActions.play, (state, {type}) => {
    console.log(type);
    return {
      ...state,
      isPlaying: true,
    };
  }),
  on(playActions.pause, (state, {type}) => {
    console.log(type);
    return {
      ...state,
      isPlaying: false
    };
  })
)
