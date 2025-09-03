import {TrackModel} from '../../models/track.model';

export interface PlayState {
  isPlaying: boolean;
  currentTrack: TrackModel;
}
