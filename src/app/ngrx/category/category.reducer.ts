import {createReducer, on} from '@ngrx/store';
import * as categoryActions from './category.action';
import {CategoryModel} from '../../models/category.model';
import {CategoryState} from './category.state';
import {TrackModel} from '../../models/track.model';

export const initialState: CategoryState = {
  categoryList: <CategoryModel[]>[],
  isLoading: false,
  isGetCategoriesLoading: false,
  error: null,
  category: <CategoryModel>{}
}

export const categoryReducer = createReducer(
  initialState,
  on(categoryActions.getAllCategories, (state, {type}) => {
    console.log(type)
    return {
      ...state,
      isGetCategoriesLoading: true,
      error: null
    }
  }),
  on(categoryActions.getAllCategoriesSuccess, (state, {categories, type}) => {
    console.log(type)
    return {
      ...state,
      categoryList: categories,
      isGetCategoriesLoading: false
    }
  }),
  on(categoryActions.getAllCategoriesFailure, (state, {type, error}) => {
    console.log(type)
    return {
      ...state,
      isGetCategoriesLoading: false,
      error: error
    }
  }),
  on(categoryActions.getCategoryDetails, (state, {type, categoryId}) => {
    console.log(type)
    return {
      ...state,
      isLoading: true,
      error: null
    }
  }),
  on(categoryActions.getCategoryDetailsSuccess, (state, {type, category}) => {
    console.log(type)
    return {
      ...state,
      isLoading: false,
      category: category
    }
  }),
  on(categoryActions.getCategoryDetailsFailure, (state, {type, error}) => {
    console.log(type)
    return {
      ...state,
      isLoading: false,
      error: error
    }
  }),

  on(categoryActions.getCategoryDetailByTrackId, (state, {type, trackId}) => {
    console.log(type)
    return {
      ...state,
      isLoading: true,
      error: null
    }
  }),

  on(categoryActions.getCategoryDetailByTrackIdSuccess, (state, {type, category}) => {
    console.log(type)
    return {
      ...state,
      isLoading: false,
      category: category
    }
  }),

  on(categoryActions.getCategoryDetailByTrackIdFailure, (state, {type, error}) => {
    console.log(type)
    return {
      ...state,
      isLoading: false,
      error: error
    }
  }),
)
