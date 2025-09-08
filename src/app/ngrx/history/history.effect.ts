import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap, withLatestFrom, filter } from 'rxjs/operators';

import { HistoryService } from '../../services/history/history.service';
import * as HistoryActions from './history.action';
import * as PlayActions from '../../ngrx/play/play.action'; // Import actions từ play
import { AuthState } from '../auth/auth.state';
import { ProfileModel } from '../../models/profile.model';

// Effect để tải lịch sử nghe nhạc
export const loadHistory$ = createEffect(
  (actions$ = inject(Actions), historyService = inject(HistoryService)) => {
    return actions$.pipe(
      ofType(HistoryActions.loadHistory),
      mergeMap(action =>
        historyService.getHistory(action.userId, action.limit ?? 50).pipe(
          map(history => HistoryActions.loadHistorySuccess({ history })),
          catchError(error => of(HistoryActions.loadHistoryFailure({ error })))
        )
      )
    );
  },
  { functional: true }
);

// Effect để tự động thêm vào lịch sử khi một bài hát được set để phát
export const addToHistoryOnSetTrack$ = createEffect(
  (
    actions$ = inject(Actions),
    historyService = inject(HistoryService),
    store = inject(Store<{ auth: { currentUser: ProfileModel } }>)
  ) => {
    return actions$.pipe(
      // 1. Lắng nghe khi một bài hát MỚI được set
      ofType(PlayActions.setTrack), 
      
      // 2. Lấy thông tin user hiện tại từ auth state
      withLatestFrom(store.pipe(select(state => state.auth.currentUser))), 
      
      // 3. Chỉ tiếp tục nếu có user ID và track ID hợp lệ
      filter(([action, user]) => !!user.uid && !!action.track.id), 
      
      // 4. Gửi request lên server
      mergeMap(([action, user]) => {
        const trackId = action.track.id.toString(); 
        
        return historyService.addToHistory(user.uid, trackId).pipe(
          // 5. Nếu thành công, dispatch action success
          map(() => HistoryActions.addToHistorySuccess()), 
          
          // 6. Nếu thất bại, dispatch action failure
          catchError(error => of(HistoryActions.addToHistoryFailure({ error }))) 
        );
      })
    );
  },
  { functional: true }
);