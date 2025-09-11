import {ProfileModel} from '../../models/profile.model';
import {createReducer, on} from '@ngrx/store';
import * as ProfileActions from './profile.actions';

export const initialProfileState = {
  profileList: <ProfileModel[]>[],
  isLoading: false,
  error: null,
}

export const profileReducer = createReducer(
  initialProfileState,
  on(ProfileActions.getProfileById, (state , {type, userId}) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ProfileActions.getProfileByIdSuccess, (state, {type, profile }) => ({
    ...state,
    profile: profile,
    loading: false,
  })),
  on(ProfileActions.getProfileByIdFailure, (state, {type, error }) => ({
    ...state,
    error: error,
    loading: false,
  })),

  on(ProfileActions.getFollowers, (state, {type, profileId})=>{
    console.log(type);
    return {
      ...state,
      isLoading: true,
      error: null,
    }
  }),

  on(ProfileActions.getFollowersSuccess, (state, {type, profileList})=>{
    console.log(type);
    return {
      ...state,
      profileList: profileList,
      isLoading: false,
      error: null,
    }
  }),

  on(ProfileActions.getFollowersFailure, (state, {type, error})=>{
    console.error(type);
    return {
      ...state,
      isLoading: false,
      error: error,
    }
  }),

  on(ProfileActions.followProfile, (state, {type, followerId, followingId})=>{
    console.log(type);
    return {
      ...state,
      isLoading: true,
      error: null,
    }
  }),

  on(ProfileActions.followProfileSuccess, (state, {type})=>{
    console.log(type);
    return {
      ...state,
      isLoading: false,
      error: null,
    }
  }),

  on(ProfileActions.followProfileFailure, (state, {type, error})=>{
    console.error(type);
    return {
      ...state,
      isLoading: false,
      error: error,
    }
  }),

  on(ProfileActions.getProfileByTrackId, (state, {type, trackId})=>{
    console.log(type);
    return {
      ...state,
      isLoading: true,
      error: null,
    }
  }),

  on(ProfileActions.getProfileByTrackIdSuccess, (state, {type, profile})=>{
    console.log(type);
    return {
      ...state,
      profile: profile,
      isLoading: false,
      error: null,
    }
  }),

  on(ProfileActions.getProfileByTrackIdFailure, (state, {type, error})=>{
    console.error(type);
    return {
      ...state,
      isLoading: false,
      error: error,
    }
  }),
)
