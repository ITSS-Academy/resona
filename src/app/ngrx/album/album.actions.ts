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

export const getAlbumById = createAction(
  '[Album] getAlbumById', props<{id: string}>()
)

export const getAlbumByIdSuccess = createAction(
  '[Album] getAlbumByIdSuccess', props<{albumDetail: AlbumModel}>()
)

export const getAlbumByIdFailure = createAction(
  '[Album] getAlbumByIdFailure', props<{error: any}>()
)

export const getAlbumsByArtist = createAction(
  '[Album] getAlbumsByArtist', props<{artist: string}>()
)

export const getAlbumsByArtistSuccess = createAction(
  '[Album] getAlbumsByArtistSuccess', props<{albumList: AlbumModel[]}>()
)

export const getAlbumsByArtistFailure = createAction(
  '[Album] getAlbumsByArtistFailure', props<{error: any}>()
)
