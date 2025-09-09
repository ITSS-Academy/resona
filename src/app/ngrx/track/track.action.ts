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

export const getTrackByCategoryId = createAction(
  '[Track] Get Track By Category Id', props<{ categoryId: string }>()
)

export const getTrackByCategoryIdSuccess = createAction(
  '[Track] Get Track By Category Id Success', props<{ tracks: TrackModel[] }>()
)

export const getTrackByCategoryIdFailure = createAction(
  '[Track] Get Track By Category Id Failure', props<{ error: any }>()
)

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

export const getTrackByOwnerId = createAction(
  '[Track] Get Track By Owner Id',
  props<{ ownerId: string }>()
);

export const getTrackByOwnerIdSuccess = createAction(
  '[Track] Get Track By Owner Id Success',
  props<{ tracks: TrackModel[] }>()
);

export const getTrackByOwnerIdFailure = createAction(
  '[Track] Get Track By Owner Id Failure',
  props<{ error: string }>()
);

export const deleteTrack = createAction(
  '[Track] Delete Track', props<{ trackId: string }>()
);

export const deleteTrackSuccess = createAction(
  '[Track] Delete Track Success', props<{ trackDetails: TrackModel }>()
);

export const deleteTrackFailure = createAction(
  '[Track] Delete Track Failure', props<{ error: any }>()
);
