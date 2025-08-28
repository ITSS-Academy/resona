import {MusicGenresState} from './musicGenres.state';
import {MusicGenresModel} from '../../models/musicGenres.model';
import {createReducer, on} from '@ngrx/store';
import * as MusicGenresActions from '../musicGenres/musicGenres.actions';

export const initialMusicGenres: MusicGenresState = {
  musicGenres:<MusicGenresModel[]>[],
  specificMusicGenre: <MusicGenresModel>{},
  isLoading: false,
  error: null,
}

export const musicGenresReducer = createReducer(
  initialMusicGenres,

  on(MusicGenresActions.getAllMusicGenres, (state, {type})=>{
    console.log(type);
    return {
      ...state,
      isLoading: true,
      error: null,
    }
  }),

  on(MusicGenresActions.getAllMusicGenresSuccess, (state, {type, musicGenresList})=>{
    console.log(type);
    return{
      ...state,
      musicGenres: musicGenresList,
      isLoading: false,
    }
  }),

  on(MusicGenresActions.getAllMusicGenresFailure, (state, {type,error})=>{
    console.log(type);
    return {
      ...state,
      isLoading: false,
      error: error
    }
  }),

  on(MusicGenresActions.getSpecificMusicGenre, (state, {type,id})=>{
    console.log(type);
    return {
      ...state,
      specificMusicGenre: <MusicGenresModel>{},
      isLoading: true,
      error: null,
    }
  }),

  on(MusicGenresActions.getSpecificMusicGenreSuccess, (state, {type,specificMusicGenre})=>{
    console.log(type);
    return {
      ...state,
      specificMusicGenre: specificMusicGenre,
      isLoading: false,
    }
  }),

  on(MusicGenresActions.getSpecificMusicGenreFailure, (state, {type,error})=>{
    console.log(type);
    return {
      ...state,
      isLoading: false,
      error: error,
    }
  }),

)
