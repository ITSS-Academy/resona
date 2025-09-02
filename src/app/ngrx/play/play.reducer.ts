import {createReducer, on} from '@ngrx/store';
import * as playActions from './play.action';

export const initialState = {
  isPlaying: false,
}

export const playReducer = createReducer(
  initialState,
  on(playActions.play, (state, {type, track}) => {
    console.log(type);
    return {
      isPlaying: true,
      currentTrack: track
    };
  }),
  on(playActions.pause, (state, {type}) => {
    console.log(type);
    return {
      isPlaying: false
    };
  })
)
