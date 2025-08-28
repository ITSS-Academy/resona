import { Injectable } from '@angular/core';
import {MusicGenresModel} from '../models/musicGenres.model';

@Injectable({
  providedIn: 'root'
})
export class MusicGenresService {
  categories: MusicGenresModel[] = [
    {
      id: 1,
      name: 'Pop',
      image: 'https://i.scdn.co/image/ab67616d0000b27308f3e7a08eb03064e6eb0af7',
      color: '#FF98BF',
      gradient: 'linear-gradient(135deg, #FF98BF 0%, #FDE2F3 100%)',
    },
    {
      id: 2,
      name: 'Rock',
      image: 'https://www.neatbeats.net/wp-content/uploads/2023/04/1-2.jpg',
      color: '#999999',
    },
    {
      id: 3,
      name: 'Hip-Hop',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoyvm1Y_PRKQ-E30YK6RpSBbOlbTHZd0jMpw&s',
      color: '#1DB954',
      gradient: 'linear-gradient(135deg, #1DB954 0%, #000000 100%)',
    },
    {
      id: 4,
      name: 'Jazz',
      image:
        'https://i.ytimg.com/vi/K7RmhU4m2no/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDVcburO3kiLKRR4uV1_6mGBNcMbw',
      color: '#6A4C93',
      gradient: 'linear-gradient(135deg, #6A4C93 0%, #B977D1 100%)',
    },
    {
      id: 5,
      name: 'Classical',
      image: 'https://f4.bcbits.com/img/a2598011156_16.jpg',
      color: '#F39C12',
    },
    {
      id: 6,
      name: 'R&B',
      image: 'https://i.scdn.co/image/ab67616d0000b273ccfa5146e54fa6a91d5bb0bd',
      color: '#8E44AD',
    },
    {
      id: 7,
      name: 'Electronic',
      image:
        'https://i0.wp.com/publicseminar.org/wp-content/uploads/2018/12/shutterstock_544851574.jpg?fit=1000%2C625&ssl=1',
      color: '#3498DB',
    },
    {
      id: 8,
      name: 'Country',
      image:
        'https://play-lh.googleusercontent.com/8cslWPWWj9tKoVot10Zx6JrGvSeJZ8LPFBp54GQAknYBBtfv5nRxm-ZO2GgmLX8rPg',
      color: '#D35400',
    },
    {
      id: 9,
      name: 'Reggae',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnmj0fc9VoChtFGkAWhrp3WQs_1wIBANgY6g&s',
      color: '#27AE60',
    },
    {
      id: 10,
      name: 'Blues',
      image:
        'https://play-lh.googleusercontent.com/4Turc7Ajuxvd5GvH0XvbW-Qu1yldwEFw29GX0ORMjZuYnJAgQffdFYFN16cdK3NmWSs',
      color: '#2980B9',
    },
    {
      id: 11,
      name: 'Folk',
      image: 'https://cdn.britannica.com/89/198289-004-74FAF303.jpg',
      color: '#2ECC71',
    },
    {
      id: 12,
      name: 'Metal',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVwR7Q6_GfMmQJFA7bZnUOslSXz81uHVPCjQ&s',
      color: '#555555',
    },
    {
      id: 13,
      name: 'Punk',
      image:
        'https://images.musicful.ai/musicfulen/assets/article/punk-music-generator.jpg',
      color: '#C0392B',
    },
    {
      id: 14,
      name: 'Soul',
      image: 'https://i.ytimg.com/vi/IqmB8TKMsH0/hqdefault.jpg?v=676bc13e',
      color: '#E67E22',
    },
    {
      id: 15,
      name: 'Disco',
      image: 'https://i.scdn.co/image/ab67616d0000b2734a8bc5c1c348dcfd94ae70f7',
      color: '#F1C40F',
      gradient: 'linear-gradient(135deg, #F1C40F 0%, #FF98BF 100%)',
    },
    {
      id: 16,
      name: 'Dance',
      image:
        'https://static01.nyt.com/images/2025/05/11/multimedia/11cul-dance-music-01-wlkj/11cul-dance-music-01-wlkj-articleLarge.jpg?quality=75&auto=webp&disable=upscale',
      color: '#E74C3C',
    },
    {
      id: 17,
      name: 'Latin',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzoVEecsbf0Dluu0owo_GjwXzw9cK-Wkt_3Q&s',
      color: '#CB4335',
    },
    {
      id: 18,
      name: 'K-Pop',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5-8Hz8L3c9U2qJlRyR8EAJilyJ1AmI5KWCQ&s',
      color: '#FF66CC',
      gradient: 'linear-gradient(135deg, #F1C40F 0%, #FF98BF 100%)',
    },
    {
      id: 19,
      name: 'Country Pop',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRY3GgHiuGanWm8o2OX2ICDXGr5KKoJhmPxsA&s',
      color: '#F5B041',
    },
    {
      id: 20,
      name: 'Dancehall',
      image:
        'https://i1.sndcdn.com/artworks-000208295569-29ga6b-t1080x1080.jpg',
      color: '#28B463',
    },
    {
      id: 21,
      name: 'Emo',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTW8jm9lHR9Pip-3yQrc2EWhG5JnUWm8T8mow&s',
      color: '#7B7D7D',
    },
    {
      id: 22,
      name: 'Ambient',
      image:
        'https://i.ytimg.com/vi/YUaSVFXTHlk/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCyymlQB8_smPN1CIHHDYbKLeNXuw',
      color: '#ABB2B9',
    },
    {
      id: 23,
      name: 'House',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbm4XPJi7lehVFFvSblvWqrhFy-pIaQqGboQ&s',
      color: '#2980B9',
    },
    {
      id: 24,
      name: 'Techno',
      image:
        'https://play-lh.googleusercontent.com/RYogoYR0yl36vQMmL5uP4K9uN5RXXNqsJauIiw_NlS6AMXi6FRtpe2Iru9VrNe6Vcw',
      color: '#2E86C1',
    },
    {
      id: 25,
      name: 'Trance',
      image:
        'https://i1.sndcdn.com/artworks-pl2oWIOdpsUnJgy1-2ASX5Q-t500x500.jpg',
      color: '#6C3483',
      gradient: 'linear-gradient(135deg, #6C3483 0%, #1ABC9C 100%)',
    },
    {
      id: 26,
      name: 'Dubstep',
      image: 'https://i.ytimg.com/vi/JQ1txLdu6qg/maxresdefault.jpg',
      color: '#1A5276',
      gradient: 'linear-gradient(135deg, #1A5276 0%, #000000 100%)',
    },
    {
      id: 27,
      name: 'Trap (EDM)',
      image:
        'https://i1.sndcdn.com/artworks-qo38hB7qTpam7KY2-qjYYBg-t500x500.jpg',
      color: '#9B59B6',
      gradient: 'linear-gradient(135deg, #1A5276 0%, #8E44AD 100%)',
    },
    {
      id: 28,
      name: 'Drum & Bass',
      image:
        'https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84a867265fbdc7196ed18ae0a1',
      color: '#16A085',
      gradient: 'linear-gradient(135deg, #16A085 0%, #E74C3C 100%)',
    },
    // { id: 29, name: 'Synthwave', image: 'https://source.unsplash.com/200x200/?synthwave', color: '#8E44AD', gradient: 'linear-gradient(135deg, #8E44AD 0%, #FF0080 100%)' },
    // { id: 30, name: 'Vaporwave', image: 'https://source.unsplash.com/200x200/?vaporwave', color: '#F62459', gradient: 'linear-gradient(135deg, #F62459 0%, #8E44AD 100%)' },
    // { id: 31, name: 'Chillwave', image: 'https://source.unsplash.com/200x200/?chillwave', color: '#45B39D' },
    // { id: 32, name: 'Lo-fi', image: 'https://source.unsplash.com/200x200/?lofi-music', color: '#5D6D7E', gradient: 'linear-gradient(135deg, #5D6D7E 0%, #95A5A6 100%)' },
    // { id: 33, name: 'World', image: 'https://source.unsplash.com/200x200/?world-music', color: '#27AE60' },
    // { id: 34, name: 'Afrobeats', image: 'https://source.unsplash.com/200x200/?afrobeats', color: '#E59866', gradient: 'linear-gradient(135deg, #E59866 0%, #F9E79F 100%)' },
    // { id: 35, name: 'Salsa', image: 'https://source.unsplash.com/200x200/?salsa-music', color: '#E74C3C' },
    // { id: 36, name: 'Bollywood', image: 'https://source.unsplash.com/200x200/?bollywood-music', color: '#D35400' },
    // { id: 37, name: 'Reggaetón', image: 'https://source.unsplash.com/200x200/?reggaeton', color: '#F1948A', gradient: 'linear-gradient(135deg, #F1948A 0%, #F5B041 100%)' },
    // { id: 38, name: 'Flamenco', image: 'https://source.unsplash.com/200x200/?flamenco', color: '#C0392B' },
    // { id: 39, name: 'Ska', image: 'https://source.unsplash.com/200x200/?ska-music', color: '#2C3E50' },
    // { id: 40, name: 'Gospel', image: 'https://source.unsplash.com/200x200/?gospel-music', color: '#1ABC9C' },
    // { id: 41, name: 'Opera', image: 'https://source.unsplash.com/200x200/?opera', color: '#7D3C98' },
    // { id: 42, name: 'Choral', image: 'https://source.unsplash.com/200x200/?choral', color: '#BDC3C7' },
    // { id: 43, name: 'Bluegrass', image: 'https://source.unsplash.com/200x200/?bluegrass', color: '#B9770E' },
    // { id: 44, name: 'Funk', image: 'https://source.unsplash.com/200x200/?funk-music', color: '#F39C12' },
    // { id: 45, name: 'Disco-Pop', image: 'https://source.unsplash.com/200x200/?disco-pop', color: '#F5B041' },
    // { id: 46, name: 'K-Rap', image: 'https://source.unsplash.com/200x200/?korean-rap', color: '#BB8FCE' },
    // { id: 47, name: 'Electro-pop', image: 'https://source.unsplash.com/200x200/?electropop', color: '#3498DB' },
    // { id: 48, name: 'Britpop', image: 'https://source.unsplash.com/200x200/?britpop', color: '#1F618D' },
    // { id: 49, name: 'New Age', image: 'https://source.unsplash.com/200x200/?new-age-music', color: '#A3E4D7' },
    // { id: 50, name: 'Soundtrack', image: 'https://source.unsplash.com/200x200/?film-score', color: '#566573' }
  ];


  getMusicGenreType(id: number){
    let musicGenre = this.categories.find(category => category.id === id);
    if (musicGenre) {
      return musicGenre;
    }else{
      return {} as MusicGenresModel;
    }
  }

}
