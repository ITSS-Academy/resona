import {ProfileModel} from './profile.model';
import {PlaylistModel} from './playlist.model';
import {CategoryModel} from './category.model';

export interface TrackModel {
  id: string;
  title: string;
  duration: number;
  filePath: string;
  viewCount: number;
  createdAt: string; // ISO date string từ API
  artistName: string;
  thumbnailPath?: string | null;
  owner: ProfileModel;
  playlists?: PlaylistModel[];
  category: CategoryModel;
  isFavorite?: boolean; // Thêm thuộc tính isFavorite
}
