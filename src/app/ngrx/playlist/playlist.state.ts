import {PlaylistModel, PopularPlaylistModel} from '../../models/playlist.model';

export interface PlaylistState {
  playlists: PlaylistModel[];
  playlist: PlaylistModel;
  popular: PopularPlaylistModel[];
  isSelectLoading: boolean;
  isLoading: boolean;
  error: any;
}
