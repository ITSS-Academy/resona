import {MusicGenresState} from './musicGenres.state';
import {MusicGenresModel} from '../../models/musicGenres.model';
import {createReducer, on} from '@ngrx/store';
import * as MusicGenresActions from '../musicGenres/musicGenres.actions';

export const initialMusicGenres: MusicGenresState = {
  musicGenres:<MusicGenresModel[]>[],
  isLoading: false,
  error: null
}

export const musicGenresReducer = createReducer(
  initialMusicGenres,

  on(MusicGenresActions.getAllMusicGenres, (state, {type})=>{
    console.log(type);
    return {
      ...state,
      isLoading: true,
    }
  }),

  on(MusicGenresActions.getAllMusicGenresSuccess, (state, {type, musicGenresList})=>{
    console.log(type);
    return{
      ...state,
      musicGenres: musicGenresList,
      isLoading: false,
      error: null,
    }
  }),

  on(MusicGenresActions.getAllMusicGenresFailure, (state, {type})=>{
    console.log(type);
    return {
      ...state,
      isLoading: false,
      error: null,
    }
  })
)
