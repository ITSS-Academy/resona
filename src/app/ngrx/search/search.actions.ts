import {createAction, props} from '@ngrx/store';
import {CategoryModel} from '../../models/category.model';

export const searchCategories = createAction(
  '[Category] Search Categories',
  props<{ query: string }>()
);

export const searchCategoriesSuccess = createAction(
  '[Category] Search Categories Success',
  props<{ categories: CategoryModel[] }>()
);

export const searchCategoriesFailure = createAction(
  '[Category] Search Categories Failure',
  props<{ error: any }>()
);
