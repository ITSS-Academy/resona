import {AlbumModel} from '../../models/album.model';

export interface AlbumState{
  albumList: AlbumModel[];
  isLoading: boolean;
  error:any;
}
