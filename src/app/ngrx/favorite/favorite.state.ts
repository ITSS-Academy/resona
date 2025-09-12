import { PlaylistModel } from '../../models/playlist.model';

export interface FavoriteState {
  playlist: PlaylistModel | null;
  loading: boolean;
  error: any;
}
