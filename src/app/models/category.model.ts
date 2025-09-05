import {TrackModel} from './track.model';

export interface CategoryModel {
  id: string;
  title: string;
  name: string;
  color?: string;
  image?: string;
  tracks?: TrackModel[];
}
