import {createAction, props} from '@ngrx/store';
import {TrackModel} from '../../models/track.model';

export const getCategoryDetail = createAction(
  '[CategoryDetail] Get Category Detail',
  props<{ categoryId: string }>()
);

export const getCategoryDetailSuccess = createAction(
  '[CategoryDetail] Get Category Detail Success',
  props<{ tracks: TrackModel[] }>()
);

export const getCategoryDetailFailure = createAction(
  '[CategoryDetail] Get Category Detail Failure',
  props<{ error: any }>()
);
