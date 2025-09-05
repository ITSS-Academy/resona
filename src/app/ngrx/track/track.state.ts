import {TrackModel} from '../../models/track.model';

export interface TrackState {
  tracks: TrackModel[];
  favoriteTracks: TrackModel[];
  trackDetails: TrackModel;
  isLoading: boolean;
  error: any;
}
