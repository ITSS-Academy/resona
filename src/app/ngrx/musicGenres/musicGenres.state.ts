import {MusicGenresModel} from '../../models/musicGenres.model';

export interface MusicGenresState{
  musicGenres: MusicGenresModel[];
  specificMusicGenre: MusicGenresModel;
  isLoading: boolean;
  error: any;
}
