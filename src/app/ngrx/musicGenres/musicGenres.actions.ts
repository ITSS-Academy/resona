import {createAction, props} from '@ngrx/store';
import {MusicGenresModel} from '../../models/musicGenres.model';

export const getAllMusicGenres = createAction(
  '[MusicGenres] getAllMusicGenres'
)

export const getAllMusicGenresSuccess = createAction(
  '[MusicGenres] getAllMusicGenresSuccess', props<{musicGenresList: MusicGenresModel[]}>()
)

export const getAllMusicGenresFailure = createAction(
  '[MusicGenres] getAllMusicGenresFailure', props<{error: any}>()
)
