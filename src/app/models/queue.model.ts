import {ProfileModel} from './profile.model';
import {TrackModel} from './track.model';

export interface QueueModel{
  id:string;
  profile : ProfileModel,
  track: TrackModel,
  position: number,
  createdAt: string,
}
