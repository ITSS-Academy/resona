import {CategoryModel} from '../../models/category.model';
import {TrackModel} from '../../models/track.model';

export interface CategoryState {
  categoryList: CategoryModel[];
  isLoading: boolean;
  isGetCategoriesLoading: boolean;
  error: any;
  category: CategoryModel;
}
