import {createAction, props} from '@ngrx/store';
import {TrackModel} from '../../models/track.model';
import {QueueModel} from '../../models/queue.model';

export const addTrackToQueue = createAction(
  '[Queue] Add Track To Queue', props<{ userId: string, trackId: string, position?: number }>()
)

export const addTrackToQueueSuccess = createAction(
  '[Queue] Add Track To Queue Success', props<{ queue: QueueModel }>()
)

export const addTrackToQueueFailure = createAction(
  '[Queue] Add Track To Queue Failure', props<{ error: any }>()
)

export const getQueueByUser = createAction(
  '[Queue] Get Queue By User', props<{ userId: string }>()
)

export const getQueueByUserSuccess = createAction(
  '[Queue] Get Queue By User Success', props<{ queueList: QueueModel[] }>()
)

export const getQueueByUserFailure = createAction(
  '[Queue] Get Queue By User Failure', props<{ error: any }>()
)

export const restoreQueue = createAction(
  '[Queue] Store Queue', props<{ queueList: QueueModel[] }>()
)

export const removeTrackFromQueue = createAction(
  '[Queue] Remove Track From Queue', props<{ userId: string, trackId: string }>()
)

export const removeTrackFromQueueSuccess = createAction(
  '[Queue] Remove Track From Queue Success', props<{ message: string }>()
)

export const removeTrackFromQueueFailure = createAction(
  '[Queue] Remove Track From Queue Failure', props<{ error: any }>()
)

export const addPlaylistToQueue = createAction(
  '[Queue] Add Playlist To Queue', props<{ userId: string, playlistId: string }>()
);

export const addPlaylistToQueueSuccess = createAction(
  '[Queue] Add Playlist To Queue Success', props<{ queueList: QueueModel[] }>()
);

export const addPlaylistToQueueFailure = createAction(
  '[Queue] Add Playlist To Queue Failure', props<{ error: any }>()
);
