import {ProfileModel} from './profile.model';
import {TrackModel} from './track.model';

export interface PlaylistModel {
  id: string;
  title: string;
  thumbnailPath: string;
  profile: ProfileModel;      // chủ sở hữu playlist
  tracks?: TrackModel[];
  description?: string;
}

export interface PopularPlaylistModel extends PlaylistModel {
  totalViews: number;
  trackCount: number;
}
