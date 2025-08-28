import {MusicGenresModel} from './musicGenres.model';

export interface AlbumModel{
  id: string;
  name:string;
  date:string;
  album:string;
  mv:string;
  audio:string;
  artist:string;
  duration:string;
  listenerCount:number;
  likeCount:number;
  commentCount:number;
  shareCount:number;
  downloadCount:number;
  genre: MusicGenresModel[];
}
