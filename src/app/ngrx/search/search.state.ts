import { PlaylistModel } from '../../models/playlist.model';
import { TrackModel } from '../../models/track.model';
import { ProfileModel } from '../../models/profile.model';
import { CategoryModel } from '../../models/category.model';

export interface SearchState {
  tracks: TrackModel[];
  playlists: PlaylistModel[];
  profiles: ProfileModel[];
  categories: CategoryModel[];
  loading: boolean;
  error: any;
}
