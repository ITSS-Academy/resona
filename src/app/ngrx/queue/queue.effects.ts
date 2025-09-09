import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as QueueActions from './queue.actions';
import {inject} from '@angular/core';
import {QueueService} from '../../services/queue/queue.service';
import {catchError, map, of, switchMap} from 'rxjs';
import {QueueModel} from '../../models/queue.model';

export const addTrackToQueueEffect = createEffect(
  (actions$ = inject(Actions), queueService = inject(QueueService)) => {
    return actions$.pipe(
      ofType(QueueActions.addTrackToQueue),
      switchMap(({userId, trackId}) =>
        queueService.addTrackToQueue(userId, trackId).pipe(
          map((queue) => QueueActions.addTrackToQueueSuccess({queue: queue})),
          catchError((error) =>
            of(QueueActions.addTrackToQueueFailure({error: error.message || 'Add to queue failed'}))
          )
        )
      )
    );
  },
  {functional: true}
);

export const getQueueByUserEffect = createEffect(
  (actions$ = inject(Actions), queueService = inject(QueueService)) => {
    return actions$.pipe(
      ofType(QueueActions.getQueueByUser),
      switchMap(({userId}) =>
        queueService.getTrackByUser(userId).pipe(
          map((queueList) => QueueActions.getQueueByUserSuccess({queueList: queueList})),
          catchError((error) =>
            of(QueueActions.getQueueByUserFailure({error: error.message || 'Get queue failed'}))
          )
        )
      )
    );
  },
  {functional: true}
);
