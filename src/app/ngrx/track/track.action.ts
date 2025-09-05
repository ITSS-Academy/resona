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


// Favorite Tracks
export const getFavoriteTracks = createAction(
  '[Track] Get Favorite Tracks',
  props<{ userId: string }>()
);

export const getFavoriteTracksSuccess = createAction(
  '[Track] Get Favorite Tracks Success',
  props<{ tracks: TrackModel[] }>()
);

export const getFavoriteTracksFailure = createAction(
  '[Track] Get Favorite Tracks Failure',
  props<{ error: string }>()
);

