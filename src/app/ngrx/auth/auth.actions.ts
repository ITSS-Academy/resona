import {createAction, props} from '@ngrx/store';
import {ProfileModel} from "../../models/profile.model";

export const login = createAction(
  '[Auth] Logging'
)

export const loginSuccess = createAction(
  '[Auth] Logging Success',
)

export const loginFailure = createAction(
  '[Auth] Logging Failure',
  props<{ error: string }>()
)

export const storeAuth = createAction(
  '[Auth] Store Auth',
  props<{ currentUser: ProfileModel, idToken: string }>()
)

export const logout = createAction(
  '[Auth] Logout'
)

export const logoutSuccess = createAction(
  '[Auth] Logout Success'
)

export const logoutFailure = createAction(
  '[Auth] Logout Failure', props<{ error: any }>()
)

export const getProfile = createAction(
    '[Auth] Get Profile',
    props<{ id: string }>()
)

export const getProfileSuccess = createAction(
  '[Auth] Get Profile Success',
  props<{ currentUser: ProfileModel }>()
)

export const getProfileFailure = createAction(
  '[Auth] Get Profile Failure',
  props<{ error: any }>()
)
