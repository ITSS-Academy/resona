import {MusicGenresModel} from '../../models/musicGenres.model';

export interface MusicGenresState{
  musicGenres: MusicGenresModel[];
  isLoading: boolean;
  error: any;
}
