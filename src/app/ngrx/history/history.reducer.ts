import { createReducer, on } from '@ngrx/store';
import { HistoryState } from './history.state';
import * as historyActions from './history.action';

export const initialHistoryState: HistoryState = {
  history: [],
  loading: false,
  error: null,
};

export const historyReducer = createReducer(
  initialHistoryState,
  on(historyActions.loadHistory, state => ({
    ...state,
    loading: true,
  })),
  on(historyActions.loadHistorySuccess, (state, { history }) => ({
    ...state,
    history,
    loading: false,
  })),
  on(historyActions.loadHistoryFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(historyActions.addToHistorySuccess, state => ({
    ...state,
    loading: false,
  })),
  on(historyActions.addToHistoryFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
