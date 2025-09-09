import {createAction, props} from '@ngrx/store';
import {CategoryModel} from '../../models/category.model';
import {TrackModel} from '../../models/track.model';
import {CategoryState} from './category.state';

export const getAllCategories = createAction(
  '[Category] Get All Categories'
);

export const getAllCategoriesSuccess = createAction(
  '[Category] Get All Categories Success',
  props<{ categories: CategoryModel[] }>()
);

export const getAllCategoriesFailure = createAction(
  '[Category] Get All Categories Failure',
  props<{ error: any }>()
);

export const getCategoryDetails = createAction(
  '[Category] Get Tracks By Category',
  props<{ categoryId: string }>()
);

export const getCategoryDetailsSuccess = createAction(
  '[Category] Get Tracks By Category Success',
  props<{ category: CategoryModel }>() // Replace 'any' with the actual track model if available
);

export const getCategoryDetailsFailure = createAction(
  '[Category] Get Tracks By Category Failure',
  props<{ error: any }>()
);

export const getCategoryDetailByTrackId = createAction(
  '[Category] Get Category Detail By Track Id',
  props<{ trackId: string }>()
);

export const getCategoryDetailByTrackIdSuccess = createAction(
  '[Category] Get Category Detail By Track Id Success',
  props<{ category: CategoryModel }>() // Replace 'any' with the actual track model if available
);

export const getCategoryDetailByTrackIdFailure = createAction(
  '[Category] Get Category Detail By Track Id Failure',
  props<{ error: any }>()
);
