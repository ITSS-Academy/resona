import {TrackModel} from '../../models/track.model';

export interface TrackState {
  tracks: TrackModel[];
  trackDetail: TrackModel;
  isLoading: boolean;
  error: any;
}
