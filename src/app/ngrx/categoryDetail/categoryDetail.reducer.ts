import {createReducer, on} from '@ngrx/store';
import * as CategoryDetailActions from './categoryDetail.action';
import {CategoryDetailState} from './categoryDetail.state';

export const initialState: CategoryDetailState = {
  tracks: [],
  isLoading: false,
  error: null
};

export const categoryDetailReducer = createReducer(
  initialState,
  on(CategoryDetailActions.getCategoryDetail, state => ({
    ...state,
    isLoading: true,
    error: null
  })),
  on(CategoryDetailActions.getCategoryDetailSuccess, (state, {tracks}) => ({
    ...state,
    tracks,
    isLoading: false
  })),
  on(CategoryDetailActions.getCategoryDetailFailure, (state, {error}) => ({
    ...state,
    isLoading: false,
    error
  }))
);
