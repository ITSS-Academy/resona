import { PlaylistModel } from '../../models/playlist.model';

export interface FavoriteState {
  playlist: PlaylistModel | null;
  loading: boolean;
  error: any;
}

export const initialFavoriteState: FavoriteState = {
  playlist: null,
  loading: false,
  error: null,
};