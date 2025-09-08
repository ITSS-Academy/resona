import { TrackModel } from './track.model';
export interface HistoryModel {
  id: string;
  playedAt: string; // ISO date string từ API
  track: TrackModel;
}
