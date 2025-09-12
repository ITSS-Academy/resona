import {AuthState} from './auth.state';
import {createReducer, on} from '@ngrx/store';
import * as AuthActions from './auth.actions';
import {ProfileModel} from "../../models/profile.model";


export const initialState: AuthState = {
  currentUser: <ProfileModel>{},
  idToken: '',
  isLogging: false,
  isLoggedIn: false,
  error: null,
}

export const authReducer = createReducer(
  initialState,
  on(
    AuthActions.login, (state, {type}) => {
      console.log(type)
      return {
        ...state,
        isLogging: true,
        error: null,
        isLoggedIn: false
      }
    }
  ),
  on(
    AuthActions.loginSuccess, (state, {type}) => {
      console.log(type)
      return {
        ...state,
        isLogging: false,
        error: null,
        isLoggedIn: true
      }
    }
  ),
  on(
    AuthActions.loginFailure, (state, {error, type}) => {
      console.error(type);
      return {
        ...state,
        isLogging: false,
        error: error,
        isLoggedIn: false
      }
    }
  ),
  on(
    AuthActions.storeAuth, (state, {currentUser, idToken, type}) => {
      console.log(type)
      return {
        ...state,
        currentUser: currentUser,
        idToken: idToken,
      }
    }
  ),
  on(AuthActions.logout, (state, {type}) => {
    console.log(type);
    return {
      ...state,
      isLoading: true,
      error: null
    }
  }),

  on(AuthActions.logoutSuccess, (state, {type}) => {
    console.log(type);
    return {
      ...state,
      currentUser: <ProfileModel>{},
      idToken: '',
      isLoading: false,
      error: null
    }
  }),

  on(AuthActions.logoutFailure, (state, {type, error}) => {
    console.log(type);
    console.log(error)
    return {
      ...state,
      isLoading: false,
      error: error
    }
  }),
  on(AuthActions.getProfile, (state, {type}) => {
    console.log(type);
    return {
      ...state,
      isLoading: true,
      error: null
    }
  }),
  on(AuthActions.getProfileSuccess, (state, {currentUser, type}) => {
    console.log(type);
    console.log("current user",currentUser)
    return {
      ...state,
      currentUser: currentUser,
      isLoading: false,
      error: null
    }
  }),
  on(AuthActions.getProfileFailure, (state, {type, error}) => {
    console.log(type);
    return {
      ...state,
      isLoading: false,
      error: error
    }
  })
)
