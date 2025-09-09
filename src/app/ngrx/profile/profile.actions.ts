import { createAction, props } from '@ngrx/store';
import { ProfileModel } from '../../models/profile.model';

export const getProfileById = createAction(
  '[Profile] Get Profile By Id',
  props<{ userId: string }>()
);

export const getProfileByIdSuccess = createAction(
  '[Profile] Get Profile By Id Success',
  props<{ profile: ProfileModel }>()
);

export const getProfileByIdFailure = createAction(
  '[Profile] Get Profile By Id Failure',
  props<{ error: string }>()
);
