import { createReducer, on } from '@ngrx/store';
import * as HistoryActions from './history.action';
import { initialHistoryState } from './history.state';


export const historyReducer = createReducer(
  initialHistoryState,
  on(HistoryActions.loadHistory, state => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(HistoryActions.loadHistorySuccess, (state, { history }) => ({
    ...state,
    history,
    loading: false,
  })),
  on(HistoryActions.loadHistoryFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

// === HANDLERS MỚI ===
// Không cần làm gì khi success, vì nó không thay đổi state ở client
on(HistoryActions.addToHistorySuccess, state => ({
  ...state,
  error: null, // Xóa lỗi cũ nếu có
  })),
on(HistoryActions.addToHistoryFailure, (state, { error }) => ({
  ...state,
  error: error, // Lưu lỗi lại để debug
  }))

);
