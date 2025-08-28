import {createAction, props} from '@ngrx/store';
import {AlbumModel} from '../../models/album.model';

export const getAllAlbums = createAction(
  '[Album] getAllAlbums'
)

export const getAllAlbumsSuccess = createAction(
  '[Album] getAllAlbumsSuccess', props<{albumList: AlbumModel[]}>()
)

export const getAllAlbumsFailure = createAction(
  '[Album] getAllAlbumsFailure', props<{error: any}>()
)
