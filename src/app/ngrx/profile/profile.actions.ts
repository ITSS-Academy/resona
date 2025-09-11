import {createAction, props} from '@ngrx/store';
import {ProfileModel} from '../../models/profile.model';

export const getFollowers = createAction(
  '[Profile] Get Followers', props<{ profileId: string }>()
)

export const getFollowersSuccess = createAction(
  '[Profile] Get Followers Success', props<{ profileList: ProfileModel[] }>()
)

export const getFollowersFailure = createAction(
  '[Profile] Get Followers Failure', props<{ error: any }>()
)

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
  props<{ error: any }>()
);

export const followProfile = createAction(
  '[Profile] Follow Profile', props<{ followerId: string; followingId: string }>()
)

export const followProfileSuccess = createAction(
  '[Profile] Follow Profile Success',
)

export const followProfileFailure = createAction(
  '[Profile] Follow Profile Failure', props<{ error: any }>()
)

export const getProfileByTrackId = createAction(
  '[Profile] Get Profile By Track Id', props<{ trackId: string }>()
);

export const getProfileByTrackIdSuccess = createAction(
  '[Profile] Get Profile By Track Id Success', props<{ profile: ProfileModel }>()
)

export const getProfileByTrackIdFailure = createAction(
  '[Profile] Get Profile By Track Id Failure', props<{ error: any }>()
)

