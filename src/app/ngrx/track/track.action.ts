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

export const incrementTrackPlayCount = createAction(
  '[Track] Increment Track Play Count',
  props<{ trackId: string }>()
);

export const incrementTrackPlayCountSuccess = createAction(
  '[Track] Increment Track Play Count Success',
  props<{ trackId: string }>()
);

export const incrementTrackPlayCountFailure = createAction(
  '[Track] Increment Track Play Count Failure',
  props<{ error: string }>()
);
