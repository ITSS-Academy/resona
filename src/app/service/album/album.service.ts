import { Injectable } from '@angular/core';
import {AlbumModel} from '../../models/album.model';
import {MusicGenresModel} from '../../models/musicGenres.model';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  constructor() { }

  albums:AlbumModel[] = [
    {
      id: '1',
      name: 'Thằng điên',
      date: 'February 2, 2017',
      album: 'https://upload.wikimedia.org/wikipedia/vi/thumb/2/20/JustaTee_-_Thang_dien.jpg/250px-JustaTee_-_Thang_dien.jpg',
      mv: 'https://photo-resize-zmp3.zmdcdn.me/w600_r300x169_jpeg/thumb_video/d/9/5/9/d9596f1082e736d59d716010bd2d2fb5.jpg',
      audio: 'https://www.youtube.com/watch?v=HXkh7EOqcQ4',
      artist: 'JustaTee, Phương Ly',
      duration: '3:35',
      listenerCount: 0,
      likeCount: 0,
      commentCount: 0,
      shareCount: 0,
      downloadCount: 0,
      genre:[
        {
          id: '1',
          name: 'Pop',
          image: 'https://i.scdn.co/image/ab67616d0000b27308f3e7a08eb03064e6eb0af7',
          color: '#FF98BF',
          gradient: 'linear-gradient(135deg, #FF98BF 0%, #FDE2F3 100%)',
        },
        {
          id: '6',
          name: 'R&B',
          image: 'https://i.scdn.co/image/ab67616d0000b273ccfa5146e54fa6a91d5bb0bd',
          color: '#8E44AD',
        }
      ]
    },
    {
      id: '2',
      name: 'Nơi này có anh',
      date: 'February 14, 2017',
      album: 'https://upload.wikimedia.org/wikipedia/vi/1/1d/N%C6%A1i_n%C3%A0y_c%C3%B3_anh_-_Single_Cover.jpg',
      mv: 'https://i.ytimg.com/vi/FN7ALfpGxiI/maxresdefault.jpg',
      audio: 'https://www.youtube.com/watch?v=qHpE45b4INk',
      artist: 'Sơn Tùng M-TP',
      duration: '4:20',
      listenerCount: 0,
      likeCount: 0,
      commentCount: 0,
      shareCount: 0,
      downloadCount: 0,
      genre:[
        {
          id: '1',
          name: 'Pop',
          image: 'https://i.scdn.co/image/ab67616d0000b27308f3e7a08eb03064e6eb0af7',
          color: '#FF98BF',
          gradient: 'linear-gradient(135deg, #FF98BF 0%, #FDE2F3 100%)',
        },
        {
          id: '6',
          name: 'R&B',
          image: 'https://i.scdn.co/image/ab67616d0000b273ccfa5146e54fa6a91d5bb0bd',
          color: '#8E44AD',
        }
      ]
    },
    {
      id: '3',
      name: 'Phép màu',
      date: 'February 14, 2025',
      album: 'https://upload.wikimedia.org/wikipedia/vi/f/f2/Phep_mau_ost.jpg',
      mv: 'https://i.ytimg.com/vi/jPjQJYKhhk4/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDd0BL1BbNCygcYeRQ-12xT_LxMhQ',
      audio: 'https://www.youtube.com/watch?v=jPjQJYKhhk4',
      artist: 'Nguyễn Quốc Hùng',
      duration: '4:27',
      listenerCount: 0,
      likeCount: 0,
      commentCount: 0,
      shareCount: 0,
      downloadCount: 0,
      genre:[
        {
          id: '1',
          name: 'Pop',
          image: 'https://i.scdn.co/image/ab67616d0000b27308f3e7a08eb03064e6eb0af7',
          color: '#FF98BF',
          gradient: 'linear-gradient(135deg, #FF98BF 0%, #FDE2F3 100%)',
        },
        {
          id: '2',
          name: 'Rock',
          image: 'https://www.neatbeats.net/wp-content/uploads/2023/04/1-2.jpg',
          color: '#999999',
        }
      ]
    }

  ]

  getAllAlbums(){
    return this.albums;
  }

  getAlbumById(id:string): AlbumModel {
    let album = this.albums.find(album => album.id === id);
    if (album) {
      return album;
    }else{
      return {} as AlbumModel
    }
  }

}
