import { createReducer, on } from '@ngrx/store';
import { initialProfileState } from './profile.state';
import * as ProfileActions from './profile.actions';

export const profileReducer = createReducer(
  initialProfileState,
  on(ProfileActions.getProfileById, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ProfileActions.getProfileByIdSuccess, (state, { profile }) => ({
    ...state,
    profile,
    loading: false,
  })),
  on(ProfileActions.getProfileByIdFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
