import {AlbumModel} from '../../models/album.model';

export interface AlbumState{
  albumList: AlbumModel[];
  albumDetail: AlbumModel;
  isLoading: boolean;
  error:any;
}
