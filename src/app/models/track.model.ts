import {ProfileModel} from './profile.model';
import {PlaylistModel} from './playlist.model';
import {MusicGenresModel} from './musicGenres.model';

export interface TrackModel {
  id: string;
  title: string;
  duration: number;
  filePath: string;
  viewCount: number;
  createdAt: string; // ISO date string từ API
  artists: string;
  thumbnailPath?: string | null;
  owner: ProfileModel;
  playlists?: PlaylistModel[];
  category: MusicGenresModel;
}
