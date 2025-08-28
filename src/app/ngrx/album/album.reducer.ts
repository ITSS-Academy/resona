import {AlbumModel} from '../../models/album.model';
import {createReducer, on} from '@ngrx/store';
import * as AlbumActions from '../album/album.actions';
import {AlbumState} from './album.state';

export const initialAlbum : AlbumState = {
  albumList: <AlbumModel[]>[],
  albumDetail: <AlbumModel>{},
  isLoading: false,
  error: null,
}

export const albumReducer = createReducer(
  initialAlbum,

  on(AlbumActions.getAllAlbums, (state, {type})=>{
    console.log(type);
    return {
      ...state,
      isLoading: true,
      error: null,
    }
  }),

  on(AlbumActions.getAllAlbumsSuccess, (state, {type,albumList})=>{
    console.log(type);
    return{
      ...state,
      albumList: albumList,
      isLoading: false,
    }
  }),

  on(AlbumActions.getAllAlbumsFailure, (state, {type, error})=>{
    console.log(type);
    return {
      ...state,
      isLoading: false,
      error: error,
    }
  }),

  on(AlbumActions.getAlbumById, (state, {type, id})=>{
    console.log(type);
    return{
      ...state,
      albumDetail: <AlbumModel>{},
      isLoading: true,
      error: null,
    }
  }),

  on(AlbumActions.getAlbumByIdSuccess, (state, {type, albumDetail})=>{
    console.log(type);
    return {
      ...state,
      albumDetail: albumDetail,
      isLoading: false,
    }
  }),

  on(AlbumActions.getAlbumByIdFailure, (state, {type, error})=>{
    console.log(type);
    return {
      ...state,
      isLoading: false,
      error: error,
    }
  }),

)
