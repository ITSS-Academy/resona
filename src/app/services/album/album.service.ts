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
      duration: '4:47',
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
      duration: '4:39',
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
      duration: '4:16',
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
    },
    {
      id: '4',
      name: 'Hạ Còn Vương Nắng',
      date: '2021',
      album: 'https://photo-resize-zmp3.zadn.vn/w600_r1x1_jpeg/cover/d/8/0/1/d801670cd8ecdb89750bdbe8de198021.jpg',
      mv: 'https://i.ytimg.com/vi/2YllmPaKhkY/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBMeCCTwKtpmE9G8sikwrUZeISn4A',
      audio: 'https://www.youtube.com/watch?v=2YllmPaKhkY',
      artist: 'DatKaa',
      duration: '4:52',
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
      ]
    },
    {
      id: '5',
      name: 'Ghé Qua',
      date: '2018',
      album: 'https://i.scdn.co/image/ab67616d0000b273c8a72f2106b40db2c8b1afc9',
      mv: 'https://i.ytimg.com/vi/zEWSSod0zTY/maxresdefault.jpg',
      audio: 'https://www.youtube.com/watch?v=zEWSSod0zTY',
      artist: 'tofutns, Dick, PC',
      duration: '4:28',
      listenerCount: 0,
      likeCount: 0,
      commentCount: 0,
      shareCount: 0,
      downloadCount: 0,
      genre:[
        {
          id: '3',
          name: 'Hip-Hop',
          image:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoyvm1Y_PRKQ-E30YK6RpSBbOlbTHZd0jMpw&s',
          color: '#1DB954',
          gradient: 'linear-gradient(135deg, #1DB954 0%, #000000 100%)',
        },
      ]
    },
    {
      id: '6',
      name: 'Attention',
      date: 'April 4, 2017',
      album: 'https://upload.wikimedia.org/wikipedia/vi/a/a3/Charlie_Puth_-_Attention_%28Official_Single_Cover%29.png',
      mv: 'https://i.ytimg.com/vi/nfs8NYg7yQM/mqdefault.jpg',
      audio: 'https://www.youtube.com/watch?v=nfs8NYg7yQM',
      artist: 'Charlie Puth, Jacob Kasher',
      duration: '3:51',
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
        },
      ]
    },
    {
      id: '7',
      name: '24H',
      date: '2019',
      album: 'https://i.scdn.co/image/ab67616d0000b273f9a33a39e11f920fabf6a5b0',
      mv: 'https://photo-resize-zmp3.zmdcdn.me/w600_r300x169_jpeg/thumb_video/4/3/9/f/439f8b9d834adfe6b2b3cfa01bdb5355.jpg',
      audio: 'https://www.youtube.com/watch?v=IpniN1Wq68Y',
      artist: 'Lyly',
      duration: '4:18',
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
        },
      ]
    },
    {
      id: '8',
      name: 'Perfect',
      date: 'September 26, 2017',
      album: 'https://upload.wikimedia.org/wikipedia/vi/8/80/Ed_Sheeran_Perfect_Single_cover.jpg',
      mv: 'https://i.ytimg.com/vi/kPhpHvnnn0Q/sddefault.jpg',
      audio: 'https://www.youtube.com/watch?v=2Vv-BfVoq4g',
      artist: 'Ed Sheeran',
      duration: '4:41',
      listenerCount: 0,
      likeCount: 0,
      commentCount: 0,
      shareCount: 0,
      downloadCount: 0,
      genre:[
        {
          id: '5',
          name: 'Classical',
          image: 'https://f4.bcbits.com/img/a2598011156_16.jpg',
          color: '#F39C12',
        },
      ]
    },
    {
      id: '9',
      name: 'Hãy trao cho anh',
      date: 'July 1, 2019',
      album: 'https://upload.wikimedia.org/wikipedia/vi/a/a5/H%C3%A3y_trao_cho_anh.jpg',
      mv: 'https://i.ytimg.com/vi/30KI5SuECuc/hqdefault.jpg',
      audio: 'https://www.youtube.com/watch?v=knW7-x7Y7RE',
      artist: 'Sơn Tùng M-TP, Snoop Dogg',
      duration: '4:23',
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
          id: '3',
          name: 'Hip-Hop',
          image:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoyvm1Y_PRKQ-E30YK6RpSBbOlbTHZd0jMpw&s',
          color: '#1DB954',
          gradient: 'linear-gradient(135deg, #1DB954 0%, #000000 100%)',
        },
        {
          id: '17',
          name: 'Latin',
          image:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzoVEecsbf0Dluu0owo_GjwXzw9cK-Wkt_3Q&s',
          color: '#CB4335',
        },
      ]
    },
    {
      id: '10',
      name: 'Đừng làm trái tim anh đau',
      date: 'June 8, 2024',
      album: 'https://i.scdn.co/image/ab67616d0000b273a1bc26cdd8eecd89da3adc39',
      mv: 'https://i.ytimg.com/vi/abPmZCZZrFA/maxresdefault.jpg',
      audio: 'https://www.youtube.com/watch?v=abPmZCZZrFA',
      artist: 'Sơn Tùng M-TP',
      duration: '5:25',
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
        },
        {
          id: '9',
          name: 'Reggae',
          image:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnmj0fc9VoChtFGkAWhrp3WQs_1wIBANgY6g&s',
          color: '#27AE60',
        },
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

  //create a function get albums by artist name
  getAlbumsByArtist(artist: string): AlbumModel[] {
    return this.albums.filter(album => album.artist.toLowerCase().includes(artist.toLowerCase()));
  }

}
