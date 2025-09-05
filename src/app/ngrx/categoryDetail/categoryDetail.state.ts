import {TrackModel} from '../../models/track.model';
import {CategoryModel} from '../../models/category.model';

export interface CategoryDetailState {
  category: CategoryModel | null;
  tracks: TrackModel[];
  isLoading: boolean;
  error: any;
}
