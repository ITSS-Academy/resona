import {TrackModel} from './track.model';
import {PlaylistModel} from './playlist.model';

export interface ProfileModel {
  id?: string;
  uid: string;
  email: string;
  name: string;
  photoURL?: string;
  createdAt?: string;
  // tracks?: TrackModel[];
  // playlists?: PlaylistModel[];
  // followers?: ProfileModel[];  // những người theo dõi mình
  // following?: ProfileModel[];
}
