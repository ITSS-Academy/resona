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
