import {TrackModel} from '../../models/track.model';

export interface TrackState {
  tracks: TrackModel[];
  trackDetail: TrackModel;
  thumbnailUrl: string;
  lyrics: string;
  isLoading: boolean;
  error: any;
}
