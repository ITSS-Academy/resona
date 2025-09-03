import {TrackModel} from '../../models/track.model';

export interface CategoryDetailState {
  tracks: TrackModel[];
  isLoading: boolean;
  error: any;
}
