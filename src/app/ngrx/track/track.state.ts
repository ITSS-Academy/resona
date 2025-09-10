import {TrackModel} from '../../models/track.model';

export interface TrackState {
  tracks: TrackModel[];
  newReleasedTracks: TrackModel[];
  popularTracks: TrackModel[];
  favoriteTracks: TrackModel[];
  trackDetail: TrackModel
  tracksSameArtist: TrackModel[];
  thumbnailUrl: string;
  lyrics: string;
  isLoading: boolean;
  error: any;
}
