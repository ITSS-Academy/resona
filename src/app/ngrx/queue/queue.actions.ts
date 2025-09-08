import {createAction, props} from '@ngrx/store';
import {TrackModel} from '../../models/track.model';
import {QueueModel} from '../../models/queue.model';

export const addTrackToQueue = createAction(
  '[Queue] Add Track To Queue', props<{userId: string, trackId: string, position?: number}>()
)

export const addTrackToQueueSuccess = createAction(
  '[Queue] Add Track To Queue Success', props<{ queue: QueueModel }>()
)

export const addTrackToQueueFailure = createAction(
  '[Queue] Add Track To Queue Failure', props<{ error: any }>()
)

export const getQueueByUser = createAction(
  '[Queue] Get Queue By User', props<{userId: string}>()
)

export const getQueueByUserSuccess = createAction(
  '[Queue] Get Queue By User Success', props<{ queueList: QueueModel[] }>()
)

export const getQueueByUserFailure = createAction(
  '[Queue] Get Queue By User Failure', props<{ error: any }>()
)
