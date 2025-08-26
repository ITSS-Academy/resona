import {Component, OnDestroy, OnInit} from '@angular/core';
import {MusicGenresService} from '../../service/music-genres.service';
import {Router} from '@angular/router';
import {MusicGenresModel} from '../../models/musicGenres.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  imports: [],
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit, OnDestroy {
  // categories = [
  //   { name: 'Classical', image: 'https://storage.googleapis.com/a1aa/image/cff2ac59-d9a7-4423-41c0-de0169f25f26.jpg' },
  //   { name: 'Pop', image: 'https://storage.googleapis.com/a1aa/image/baab503d-46f0-4100-fe62-16d5b62cb921.jpg' },
  //   { name: 'Rock', image: 'https://storage.googleapis.com/a1aa/image/a313b2fc-895f-4a75-b28e-520be109364f.jpg' },
  //   { name: 'Jazz', image: 'https://storage.googleapis.com/a1aa/image/70374d57-2f63-4c33-fdf9-ce6b9fa36157.jpg' },
  //   { name: 'Hip-Hop', image: 'https://storage.googleapis.com/a1aa/image/31b1495a-dede-4073-b0ed-f729a8114e37.jpg' }
  // ];
  // playlists = [
  //   { name: 'Morning Vibes', image: 'https://storage.googleapis.com/a1aa/image/97a157ab-946c-4f1a-40ac-64a6ed348cd0.jpg', tracks: 20 },
  //   { name: 'Chill Hits', image: 'https://storage.googleapis.com/a1aa/image/85313881-6d2d-4d8d-6da3-a81764e3db92.jpg', tracks: 15 },
  //   { name: 'Workout', image: 'https://storage.googleapis.com/a1aa/image/1fa27d17-d457-43ed-3134-8c882755f619.jpg', tracks: 30 },
  //   { name: 'Focus', image: 'https://storage.googleapis.com/a1aa/image/1338182e-0d67-43ea-c6ee-33636c4593b5.jpg', tracks: 18 }
  // ];

  // categories = Array.from({ length: 50}, (_, i) => ({
  //   id: i + 1,
  //   name: `Category ${i + 1}`,
  //   color: this.getRandomColor(),
  //   image: `https://picsum.photos/200?random=${i + 1}`
  // }));
  //
  // private getRandomColor(): string {
  //   const colors = [
  //     '#E13300','#1DB954','#509BF5','#F59B23',
  //     '#9B59B6','#FF5733','#00A8CC','#FF4081',
  //     '#2ECC71','#F1C40F','#34495E','#E91E63'
  //   ];
  //   return colors[Math.floor(Math.random() * colors.length)];
  // }
  //
  // categories = [
  //   {id: 1, name: 'Pop', image: 'https://i.scdn.co/image/ab67616d0000b27308f3e7a08eb03064e6eb0af7', color: '#FF98BF'},
  //   {id: 2, name: 'Rock', image: 'https://www.neatbeats.net/wp-content/uploads/2023/04/1-2.jpg', color: '#999999'},
  //   {
  //     id: 3,
  //     name: 'Hip-Hop',
  //     image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoyvm1Y_PRKQ-E30YK6RpSBbOlbTHZd0jMpw&s',
  //     color: '#1DB954'
  //   },
  //   {id: 4, name: 'Jazz', image: 'https://source.unsplash.com/200x200/?jazz', color: '#6A4C93'},
  //   {id: 5, name: 'Classical', image: 'https://source.unsplash.com/200x200/?classical-music', color: '#F39C12'},
  //   {id: 6, name: 'R&B', image: 'https://source.unsplash.com/200x200/?rnb', color: '#8E44AD'},
  //   {id: 7, name: 'Electronic', image: 'https://source.unsplash.com/200x200/?electronic-music', color: '#3498DB'},
  //   {id: 8, name: 'Country', image: 'https://source.unsplash.com/200x200/?country-music', color: '#D35400'},
  //   {id: 9, name: 'Reggae', image: 'https://source.unsplash.com/200x200/?reggae', color: '#27AE60'},
  //   {id: 10, name: 'Blues', image: 'https://source.unsplash.com/200x200/?blues', color: '#2980B9'},
  //   {id: 11, name: 'Folk', image: 'https://source.unsplash.com/200x200/?folk-music', color: '#2ECC71'},
  //   {id: 12, name: 'Metal', image: 'https://source.unsplash.com/200x200/?metal-music', color: '#555555'},
  //   {id: 13, name: 'Punk', image: 'https://source.unsplash.com/200x200/?punk-music', color: '#C0392B'},
  //   {id: 14, name: 'Soul', image: 'https://source.unsplash.com/200x200/?soul-music', color: '#E67E22'},
  //   {id: 15, name: 'Disco', image: 'https://source.unsplash.com/200x200/?disco', color: '#F1C40F'},
  //   {id: 16, name: 'Dance', image: 'https://source.unsplash.com/200x200/?dance-music', color: '#E74C3C'},
  //   {id: 17, name: 'Latin', image: 'https://source.unsplash.com/200x200/?latin-music', color: '#CB4335'},
  //   {id: 18, name: 'K-Pop', image: 'https://source.unsplash.com/200x200/?kpop', color: '#FF66CC'},
  //   {id: 19, name: 'Country Pop', image: 'https://source.unsplash.com/200x200/?country-pop', color: '#F5B041'},
  //   {id: 20, name: 'Dancehall', image: 'https://source.unsplash.com/200x200/?dancehall', color: '#28B463'},
  //   {id: 21, name: 'Emo', image: 'https://source.unsplash.com/200x200/?emo-music', color: '#7B7D7D'},
  //   {id: 22, name: 'Ambient', image: 'https://source.unsplash.com/200x200/?ambient-music', color: '#ABB2B9'},
  //   {id: 23, name: 'House', image: 'https://source.unsplash.com/200x200/?house-music', color: '#2980B9'},
  //   {id: 24, name: 'Techno', image: 'https://source.unsplash.com/200x200/?techno', color: '#2E86C1'},
  //   {id: 25, name: 'Trance', image: 'https://source.unsplash.com/200x200/?trance-music', color: '#6C3483'},
  //   {id: 26, name: 'Dubstep', image: 'https://source.unsplash.com/200x200/?dubstep', color: '#1A5276'},
  //   {id: 27, name: 'Trap (EDM)', image: 'https://source.unsplash.com/200x200/?trap-music', color: '#9B59B6'},
  //   {id: 28, name: 'Drum & Bass', image: 'https://source.unsplash.com/200x200/?drum-and-bass', color: '#16A085'},
  //   {id: 29, name: 'Synthwave', image: 'https://source.unsplash.com/200x200/?synthwave', color: '#8E44AD'},
  //   {id: 30, name: 'Vaporwave', image: 'https://source.unsplash.com/200x200/?vaporwave', color: '#F62459'},
  //   {id: 31, name: 'Chillwave', image: 'https://source.unsplash.com/200x200/?chillwave', color: '#45B39D'},
  //   {id: 32, name: 'Lo-fi', image: 'https://source.unsplash.com/200x200/?lofi-music', color: '#5D6D7E'},
  //   {id: 33, name: 'World', image: 'https://source.unsplash.com/200x200/?world-music', color: '#27AE60'},
  //   {id: 34, name: 'Afrobeats', image: 'https://source.unsplash.com/200x200/?afrobeats', color: '#E59866'},
  //   {id: 35, name: 'Salsa', image: 'https://source.unsplash.com/200x200/?salsa-music', color: '#E74C3C'},
  //   {id: 36, name: 'Bollywood', image: 'https://source.unsplash.com/200x200/?bollywood-music', color: '#D35400'},
  //   {id: 37, name: 'Reggaetón', image: 'https://source.unsplash.com/200x200/?reggaeton', color: '#F1948A'},
  //   {id: 38, name: 'Flamenco', image: 'https://source.unsplash.com/200x200/?flamenco', color: '#C0392B'},
  //   {id: 39, name: 'Ska', image: 'https://source.unsplash.com/200x200/?ska-music', color: '#2C3E50'},
  //   {id: 40, name: 'Gospel', image: 'https://source.unsplash.com/200x200/?gospel-music', color: '#1ABC9C'},
  //   {id: 41, name: 'Opera', image: 'https://source.unsplash.com/200x200/?opera', color: '#7D3C98'},
  //   {id: 42, name: 'Choral', image: 'https://source.unsplash.com/200x200/?choral', color: '#BDC3C7'},
  //   {id: 43, name: 'Bluegrass', image: 'https://source.unsplash.com/200x200/?bluegrass', color: '#B9770E'},
  //   {id: 44, name: 'Funk', image: 'https://source.unsplash.com/200x200/?funk-music', color: '#F39C12'},
  //   {id: 45, name: 'Disco-Pop', image: 'https://source.unsplash.com/200x200/?disco-pop', color: '#F5B041'},
  //   {id: 46, name: 'K-Rap', image: 'https://source.unsplash.com/200x200/?korean-rap', color: '#BB8FCE'},
  //   {id: 47, name: 'Electro-pop', image: 'https://source.unsplash.com/200x200/?electropop', color: '#3498DB'},
  //   {id: 48, name: 'Britpop', image: 'https://source.unsplash.com/200x200/?britpop', color: '#1F618D'},
  //   {id: 49, name: 'New Age', image: 'https://source.unsplash.com/200x200/?new-age-music', color: '#A3E4D7'},
  //   {id: 50, name: 'Soundtrack', image: 'https://source.unsplash.com/200x200/?film-score', color: '#566573'}
  // ];

  musicGenres: MusicGenresModel[] =[];

  constructor(
    private router: Router,
    private musicGenresService: MusicGenresService,
  ) {
    this.musicGenres = this.musicGenresService.categories;
    console.log(this.musicGenres);
  }

  navigateToCategoryDetail(id: string) {
    this.router.navigate(['/category-detail',id]).then();
  }

  ngOnInit() {}

  ngOnDestroy() {}

}
