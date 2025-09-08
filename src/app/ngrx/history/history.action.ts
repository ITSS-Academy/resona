import { createAction, props } from '@ngrx/store';
import { HistoryModel } from '../../models/history.model';

export const loadHistory = createAction(
  '[History] Load History',
  props<{ userId: string; limit?: number }>()
);

export const loadHistorySuccess = createAction(
  '[History] Load History Success',
  props<{ history: HistoryModel[] }>()
);

export const loadHistoryFailure = createAction(
  '[History] Load History Failure',
  props<{ error: any }>()
);

// === ACTIONS MỚI ===
export const addToHistorySuccess = createAction(
  '[History API] Add To History Success'
);

export const addToHistoryFailure = createAction(
  '[History API] Add To History Failure',
  props<{ error: any }>()
);
