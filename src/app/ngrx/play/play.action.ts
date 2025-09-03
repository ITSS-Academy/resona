import {createAction, props} from '@ngrx/store';
import {TrackModel} from '../../models/track.model';

export const play = createAction(
  '[Play] Play',
  props<{ track: TrackModel }>()
)

export const pause = createAction(
  '[Play] Pause',
)
