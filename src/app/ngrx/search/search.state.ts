import {CategoryModel} from '../../models/category.model';

export interface SearchState {
  searchCategories: CategoryModel[];
  isLoading: boolean;
  error: any;
}
