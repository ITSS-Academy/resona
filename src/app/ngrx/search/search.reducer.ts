import {CategoryModel} from '../../models/category.model';
import {createReducer, on} from '@ngrx/store';
import * as SearchActions from './search.actions';

export const initialState = {
  searchCategories: <CategoryModel[]>[],
  isLoading: false,
  error: null,
}

export const searchReducer = createReducer(
  initialState,
  on(SearchActions.searchCategories, (state, {type}) => {
    console.log(type)
    return {
      ...state,
      isLoading: true,
      error: null
    }
  }),
  on(SearchActions.searchCategoriesSuccess, (state, {type, categories}) => {
    console.log(type)
    return {
      ...state,
      searchCategories: categories,
      isLoading: false,
      error: null
    }
  }),
  on(SearchActions.searchCategoriesFailure, (state, {type, error}) => {
    console.log(type)
    return {
      ...state,
      isLoading: false,
      error: error
    }
  }),
)
