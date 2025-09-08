import {CategoryModel} from '../../models/category.model';
import {ProfileModel} from '../../models/profile.model';
import {PlaylistModel} from '../../models/playlist.model';
import {TrackModel} from '../../models/track.model';

export interface SearchState {
  searchCategories: CategoryModel[];
  searchProfiles: ProfileModel[];
  searchPlaylists: PlaylistModel[];
  searchTracks: TrackModel[];
  isLoading: boolean;
  error: any;
}

export const initialSearchState: SearchState = {
  searchCategories: [],
  searchProfiles: [],
  searchPlaylists: [],
  searchTracks: [],
  isLoading: false,
  error: null,
};
