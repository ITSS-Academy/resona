import {createAction, props} from '@ngrx/store';
import {TrackModel} from '../../models/track.model';

// Upload Track
export const uploadTrack = createAction(
  '[Track] Upload Track',
  props<{
    file: File,
    originalFileName: string;
    thumbnail: File,
    title: string;
    categoryId: string,
    artists: string,
    lyrics: string
  }>()
)

export const uploadTrackSuccess = createAction(
  '[Track] Upload Track Success',
  props<{ track: TrackModel }>()
)

export const uploadTrackFailure = createAction(
  '[Track] Upload Track Failure',
  props<{ error: string }>()
);

export const getTrackById = createAction(
  '[Track] Get Track By Id', props<{ id: string }>()
)

export const getTrackByIdSuccess = createAction(
  '[Track] Get Track By Id Success', props<{ trackDetail: TrackModel }>()
)

export const getTrackByIdFailure = createAction(
  '[Track] Get Track By Id Failure', props<{ error: any }>()
)

export const getThumbnailBasedOnTrackId = createAction(
  '[Track] Get Thumbnail Based On Track Id', props<{ id: string }>()
)

export const getThumbnailBasedOnTrackIdSuccess = createAction(
  '[Track] Get Thumbnail Based On Track Id Success', props<{ thumbnailUrl: string }>()
)

export const getThumbnailBasedOnTrackIdFailure = createAction(
  '[Track] Get Thumbnail Based On Track Id Failure', props<{ error: any }>()
)

export const getLyricsByTrackId = createAction(
  '[Track] Get Lyrics By Track Id', props<{ id: string }>()
)

export const getLyricsByTrackIdSuccess = createAction(
  '[Track] Get Lyrics By Track Id Success', props<{ lyrics: string }>()
)

export const getLyricsByTrackIdFailure = createAction(
  '[Track] Get Lyrics By Track Id Failure', props<{ error: any }>()
)

