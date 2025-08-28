import {AlbumModel} from '../../models/album.model';
import {createReducer, on} from '@ngrx/store';
import * as AlbumActions from '../album/album.actions';
import {AlbumState} from './album.state';

export const initialAlbum : AlbumState = {
  albumList: <AlbumModel[]>[],
  isLoading: false,
  error: null,
}

export const albumReducer = createReducer(
  initialAlbum,

  on(AlbumActions.getAllAlbums, (state, {type})=>{
    console.log(type);
    return {
      ...state,
    }
  }),

  on(AlbumActions.getAllAlbumsSuccess, (state, {type,albumList})=>{
    console.log(type);
    return{
      ...state,
      albumList: albumList,
    }
  }),

  on(AlbumActions.getAllAlbumsFailure, (state, {type, error})=>{
    console.log(type);
    return {
      ...state,
      error: error,
    }
  }),
)
