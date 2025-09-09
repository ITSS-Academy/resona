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
  '[Category] Get Category Details',
  props<{ categoryId: string }>()
);

export const getCategoryDetailsSuccess = createAction(
  '[Category] Get Category Details Success',
  props<{ category: CategoryModel }>()
);

export const getCategoryDetailsFailure = createAction(
  '[Category] Get Category Details Failure',
  props<{ error: any }>()
);

export const getTracksByCategory = createAction(
  '[Category] Get Tracks By Category',
  props<{ categoryId: string }>()
);

export const getTracksByCategorySuccess = createAction(
  '[Category] Get Tracks By Category Success',
  props<{ tracks: TrackModel[] }>()
);

export const getTracksByCategoryFailure = createAction(
  '[Category] Get Tracks By Category Failure',
  props<{ error: any }>()
);
