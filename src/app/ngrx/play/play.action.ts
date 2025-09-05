import {createAction, props} from '@ngrx/store';
import {TrackModel} from '../../models/track.model';

export const setTrack = createAction(
  '[Play] Set Track',
  props<{ track: TrackModel }>()
);

export const play = createAction(
  '[Play] Play'
)

export const pause = createAction(
  '[Play] Pause'
)
