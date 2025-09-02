import {PlaylistModel} from '../../models/playlist.model';

export interface PlaylistState {
  playlists: PlaylistModel[];
  playlist: PlaylistModel;
  loading: boolean;
  error: any;
}
