import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as QueueActions from './queue.actions';
import { inject } from '@angular/core';
import { QueueService } from '../../services/queue/queue.service';
import { catchError, map, of, switchMap } from 'rxjs';
import { QueueModel } from '../../models/queue.model';

export const addTrackToQueueEffect = createEffect(
  (actions$ = inject(Actions), queueService = inject(QueueService)) => {
    return actions$.pipe(
      ofType(QueueActions.addTrackToQueue),
      switchMap(({ userId, trackId }) =>
        queueService.addTrackToQueue(userId, trackId).pipe(
          map((queue) => QueueActions.addTrackToQueueSuccess({ queue: queue })),
          catchError((error) =>
            of(
              QueueActions.addTrackToQueueFailure({
                error: error.message || 'Add to queue failed',
              })
            )
          )
        )
      )
    );
  },
  { functional: true }
);

export const getQueueByUserEffect = createEffect(
  (actions$ = inject(Actions), queueService = inject(QueueService)) => {
    return actions$.pipe(
      ofType(QueueActions.getQueueByUser),
      switchMap(({ userId }) =>
        queueService.getTrackByUser(userId).pipe(
          map((queueList) =>
            QueueActions.getQueueByUserSuccess({ queueList: queueList })
          ),
          catchError((error) =>
            of(
              QueueActions.getQueueByUserFailure({
                error: error.message || 'Get queue failed',
              })
            )
          )
        )
      )
    );
  },
  { functional: true }
);

export const removeTrackFromQueueEffect = createEffect(
  (actions$ = inject(Actions), queueService = inject(QueueService)) => {
    return actions$.pipe(
      ofType(QueueActions.removeTrackFromQueue),
      switchMap(({ userId, trackId }) =>
        queueService.removeTrackFromQueue(userId, trackId).pipe(
          map((response: { message: string }) =>
            QueueActions.removeTrackFromQueueSuccess({
              message: response.message,
            })
          ),
          catchError((error) =>
            of(
              QueueActions.removeTrackFromQueueFailure({
                error: error.message || 'Remove from queue failed',
              })
            )
          )
        )
      )
    );
  },
  { functional: true }
);

export const addPlaylistToQueueEffect = createEffect(
  (actions$ = inject(Actions), queueService = inject(QueueService)) => {
    return actions$.pipe(
      ofType(QueueActions.addPlaylistToQueue),
      switchMap(({ userId, playlistId }) =>
        queueService.addPlaylistToQueue(userId, playlistId).pipe(
          switchMap((response: any) => [
            // Sau khi thêm playlist thành công, ta tải lại toàn bộ queue
            // để đảm bảo dữ liệu ở frontend được đồng bộ và đầy đủ.
            QueueActions.getQueueByUser({ userId: userId }),
          ]),
          catchError((error) =>
            of(
              QueueActions.addPlaylistToQueueFailure({
                error: error.message || 'Add playlist to queue failed',
              })
            )
          )
        )
      )
    );
  },
  { functional: true }
);

export const playSongNowEffect = createEffect(
  (actions$ = inject(Actions), queueService = inject(QueueService)) => {
    return actions$.pipe(
      ofType(QueueActions.playSongNow),
      switchMap(({ userId, trackId }) =>
        queueService.playSongNow(userId, trackId).pipe(
          map((response) =>
            QueueActions.playSongNowSuccess({ message: response.message })
          ),
          catchError((error) =>
            of(
              QueueActions.playSongNowFailure({
                error: error.message || 'Play song now failed',
              })
            )
          )
        )
      )
    );
  },
  { functional: true }
);
