import {PlaylistModel, PopularPlaylistModel} from '../../models/playlist.model';

export interface PlaylistState {
  playlists: PlaylistModel[];
  playlist: PlaylistModel;
  popular: PopularPlaylistModel[];
  isLoading: boolean;
  error: any;
}
