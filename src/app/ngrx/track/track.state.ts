import {TrackModel} from '../../models/track.model';

export interface TrackState {
  tracks: TrackModel[];
  favoriteTracks: TrackModel[];
  trackDetails: TrackModel
  tracksSameArtist: TrackModel[];
  thumbnailUrl: string;
  lyrics: string;
  isLoading: boolean;
  error: any;
}
