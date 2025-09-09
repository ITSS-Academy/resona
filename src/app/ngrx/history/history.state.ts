import { HistoryModel } from '../../models/history.model';

export interface HistoryState {
  history: HistoryModel[];
  loading: boolean;
  error: any;
  }

export const initialHistoryState: HistoryState = {
  history: [],
  loading: false,
  error: null,
  };
