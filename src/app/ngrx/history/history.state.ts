import { HistoryModel } from '../../models/history.model';

export interface HistoryState {
  history: HistoryModel[];
  loading: boolean;
  error: any;
}