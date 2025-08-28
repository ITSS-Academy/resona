import { Injectable } from '@angular/core';
import {NewReleaseSongModel} from '../models/newReleaseSong.model';

@Injectable({
  providedIn: 'root'
})
export class NewReleaseSongsService {
  songs: NewReleaseSongModel[] = [
    {
      title: 'Name music 1',
      artist: 'Saint Tame MP',
      imageUrl: 'https://storage.googleapis.com/a1aa/image/97a157ab-946c-4f1a-40ac-64a6ed348cd0.jpg',
      releaseDate: 'Aug 16, 2025',
      duration: '3:20'
    },
    {
      title: 'Summer Breeze',
      artist: 'Adele',
      imageUrl: 'https://storage.googleapis.com/a1aa/image/70374d57-2f63-4c33-fdf9-ce6b9fa36157.jpg',
      releaseDate: 'Aug 10, 2025',
      duration: '4:05'
    },
    {
      title: 'Night Drive',
      artist: 'Harry Styles',
      imageUrl: 'https://storage.googleapis.com/a1aa/image/1fa27d17-d457-43ed-3134-8c882755f619.jpg',
      releaseDate: 'Aug 5, 2025',
      duration: '3:45'
    },
    {
      title: 'Eternal Light',
      artist: 'Aurora Lane',
      imageUrl: 'https://placehold.co/600x600?text=Eternal%20Light',
      releaseDate: 'Aug 16, 2025',
      duration: '3:20'
    },
    {
      title: 'Summer Breeze',
      artist: 'Adele',
      imageUrl: 'https://placehold.co/600x600?text=Summer%20Breeze',
      releaseDate: 'Aug 10, 2025',
      duration: '4:05'
    },
    {
      title: 'Night Drive',
      artist: 'Harry Styles',
      imageUrl: 'https://placehold.co/600x600?text=Night%20Drive',
      releaseDate: 'Aug 5, 2025',
      duration: '3:45'
    },

    {
      title: 'Golden Skies',
      artist: 'Taylor Swift',
      imageUrl: 'https://placehold.co/600x600?text=Golden%20Skies',
      releaseDate: 'Jul 28, 2025',
      duration: '3:50'
    },
    {
      title: 'Moonlight Dreams',
      artist: 'Shawn Mendes',
      imageUrl: 'https://placehold.co/600x600?text=Moonlight%20Dreams',
      releaseDate: 'Jul 22, 2025',
      duration: '4:12'
    },
    {
      title: 'Electric Heart',
      artist: 'Dua Lipa',
      imageUrl: 'https://placehold.co/600x600?text=Electric%20Heart',
      releaseDate: 'Jul 15, 2025',
      duration: '3:30'
    },
    {
      title: 'Lost in Space',
      artist: 'The Weeknd',
      imageUrl: 'https://placehold.co/600x600?text=Lost%20in%20Space',
      releaseDate: 'Jul 10, 2025',
      duration: '4:00'
    },
    {
      title: 'Falling Stars',
      artist: 'Billie Eilish',
      imageUrl: 'https://placehold.co/600x600?text=Falling%20Stars',
      releaseDate: 'Jul 3, 2025',
      duration: '3:40'
    },
    {
      title: 'Ocean Eyes II',
      artist: 'Billie Eilish',
      imageUrl: 'https://placehold.co/600x600?text=Ocean%20Eyes%20II',
      releaseDate: 'Jun 28, 2025',
      duration: '3:55'
    },
    {
      title: 'Violet Nights',
      artist: 'Charlie Puth',
      imageUrl: 'https://placehold.co/600x600?text=Violet%20Nights',
      releaseDate: 'Jun 21, 2025',
      duration: '4:18'
    },
    {
      title: 'Runaway Love',
      artist: 'Selena Gomez',
      imageUrl: 'https://placehold.co/600x600?text=Runaway%20Love',
      releaseDate: 'Jun 14, 2025',
      duration: '3:15'
    },
    {
      title: 'Afterglow',
      artist: 'Ed Sheeran',
      imageUrl: 'https://placehold.co/600x600?text=Afterglow',
      releaseDate: 'Jun 10, 2025',
      duration: '3:47'
    },
    {
      title: 'City Lights',
      artist: 'Drake',
      imageUrl: 'https://placehold.co/600x600?text=City%20Lights',
      releaseDate: 'Jun 3, 2025',
      duration: '4:08'
    },
    {
      title: 'Velvet Touch',
      artist: 'Ariana Grande',
      imageUrl: 'https://placehold.co/600x600?text=Velvet%20Touch',
      releaseDate: 'May 28, 2025',
      duration: '3:42'
    },
    {
      title: 'Infinity',
      artist: 'Imagine Dragons',
      imageUrl: 'https://placehold.co/600x600?text=Infinity',
      releaseDate: 'May 22, 2025',
      duration: '4:10'
    },
    {
      title: 'Dreamcatcher',
      artist: 'Post Malone',
      imageUrl: 'https://placehold.co/600x600?text=Dreamcatcher',
      releaseDate: 'May 16, 2025',
      duration: '3:38'
    },
    {
      title: 'Crystal Waves',
      artist: 'Sia',
      imageUrl: 'https://placehold.co/600x600?text=Crystal%20Waves',
      releaseDate: 'May 10, 2025',
      duration: '3:57'
    },
    {
      title: 'Dark Paradise',
      artist: 'Lana Del Rey',
      imageUrl: 'https://placehold.co/600x600?text=Dark%20Paradise',
      releaseDate: 'May 5, 2025',
      duration: '4:22'
    },
    {
      title: 'Sunflower',
      artist: 'Post Malone',
      imageUrl: 'https://placehold.co/600x600?text=Sunflower',
      releaseDate: 'Apr 28, 2025',
      duration: '3:18'
    },
    {
      title: 'Blinding Lights II',
      artist: 'The Weeknd',
      imageUrl: 'https://placehold.co/600x600?text=Blinding%20Lights%20II',
      releaseDate: 'Apr 22, 2025',
      duration: '3:44'
    },
    {
      title: 'Gravity',
      artist: 'John Mayer',
      imageUrl: 'https://placehold.co/600x600?text=Gravity',
      releaseDate: 'Apr 15, 2025',
      duration: '4:01'
    },
    {
      title: 'Skyfall II',
      artist: 'Adele',
      imageUrl: 'https://placehold.co/600x600?text=Skyfall%20II',
      releaseDate: 'Apr 10, 2025',
      duration: '4:25'
    },
    {
      title: 'Horizons',
      artist: 'Coldplay',
      imageUrl: 'https://placehold.co/600x600?text=Horizons',
      releaseDate: 'Apr 5, 2025',
      duration: '3:36'
    },
    {
      title: 'Neon Lights',
      artist: 'Demi Lovato',
      imageUrl: 'https://placehold.co/600x600?text=Neon%20Lights',
      releaseDate: 'Mar 29, 2025',
      duration: '3:59'
    },
    {
      title: 'Silent Echo',
      artist: 'Zayn Malik',
      imageUrl: 'https://placehold.co/600x600?text=Silent%20Echo',
      releaseDate: 'Mar 24, 2025',
      duration: '3:41'
    },
    {
      title: 'Rhythm Divine',
      artist: 'Enrique Iglesias',
      imageUrl: 'https://placehold.co/600x600?text=Rhythm%20Divine',
      releaseDate: 'Mar 18, 2025',
      duration: '4:02'
    },
    {
      title: 'Firestarter',
      artist: 'Rihanna',
      imageUrl: 'https://placehold.co/600x600?text=Firestarter',
      releaseDate: 'Mar 12, 2025',
      duration: '3:33'
    },
    {
      title: 'Legends Never Die',
      artist: 'Alan Walker',
      imageUrl: 'https://placehold.co/600x600?text=Legends%20Never%20Die',
      releaseDate: 'Mar 6, 2025',
      duration: '3:48'
    },
    {
      title: 'Phoenix',
      artist: 'Imagine Dragons',
      imageUrl: 'https://placehold.co/600x600?text=Phoenix',
      releaseDate: 'Mar 1, 2025',
      duration: '4:07'
    }
    // {
    //   title: 'Eternal Light',
    //   artist: 'Aurora Lane',
    //   imageUrl: 'https://images.pexels.com/photos/164745/pexels-photo-164745.jpeg',
    //   releaseDate: 'Aug 16, 2025',
    //   duration: '3:20'
    // },
    // {
    //   title: 'Summer Breeze',
    //   artist: 'Adele',
    //   imageUrl: 'https://images.pexels.com/photos/7130555/pexels-photo-7130555.jpeg',
    //   releaseDate: 'Aug 10, 2025',
    //   duration: '4:05'
    // },
    // {
    //   title: 'Night Drive',
    //   artist: 'Harry Styles',
    //   imageUrl: 'https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg',
    //   releaseDate: 'Aug 5, 2025',
    //   duration: '3:45'
    // },
    // {
    //   title: 'Golden Skies',
    //   artist: 'Taylor Swift',
    //   imageUrl: 'https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg',
    //   releaseDate: 'Jul 28, 2025',
    //   duration: '3:50'
    // },
    // {
    //   title: 'Moonlight Dreams',
    //   artist: 'Shawn Mendes',
    //   imageUrl: 'https://images.pexels.com/photos/556669/pexels-photo-556669.jpeg',
    //   releaseDate: 'Jul 22, 2025',
    //   duration: '4:12'
    // },
    // {
    //   title: 'Electric Heart',
    //   artist: 'Dua Lipa',
    //   imageUrl: 'https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg',
    //   releaseDate: 'Jul 15, 2025',
    //   duration: '3:30'
    // },
    // {
    //   title: 'Lost in Space',
    //   artist: 'The Weeknd',
    //   imageUrl: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg',
    //   releaseDate: 'Jul 10, 2025',
    //   duration: '4:00'
    // },
    // {
    //   title: 'Falling Stars',
    //   artist: 'Billie Eilish',
    //   imageUrl: 'https://images.pexels.com/photos/789822/pexels-photo-789822.jpeg',
    //   releaseDate: 'Jul 3, 2025',
    //   duration: '3:40'
    // },
    // {
    //   title: 'Ocean Eyes II',
    //   artist: 'Billie Eilish',
    //   imageUrl: 'https://images.pexels.com/photos/169573/pexels-photo-169573.jpeg',
    //   releaseDate: 'Jun 28, 2025',
    //   duration: '3:55'
    // },
    // {
    //   title: 'Violet Nights',
    //   artist: 'Charlie Puth',
    //   imageUrl: 'https://images.pexels.com/photos/374148/pexels-photo-374148.jpeg',
    //   releaseDate: 'Jun 21, 2025',
    //   duration: '4:18'
    // },
    // {
    //   title: 'Runaway Love',
    //   artist: 'Selena Gomez',
    //   imageUrl: 'https://images.pexels.com/photos/21014/pexels-photo.jpg',
    //   releaseDate: 'Jun 14, 2025',
    //   duration: '3:15'
    // },
    // {
    //   title: 'Afterglow',
    //   artist: 'Ed Sheeran',
    //   imageUrl: 'https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg',
    //   releaseDate: 'Jun 10, 2025',
    //   duration: '3:47'
    // },
    // {
    //   title: 'City Lights',
    //   artist: 'Drake',
    //   imageUrl: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg',
    //   releaseDate: 'Jun 3, 2025',
    //   duration: '4:08'
    // },
    // {
    //   title: 'Velvet Touch',
    //   artist: 'Ariana Grande',
    //   imageUrl: 'https://images.pexels.com/photos/164936/pexels-photo-164936.jpeg',
    //   releaseDate: 'May 28, 2025',
    //   duration: '3:42'
    // },
    // {
    //   title: 'Infinity',
    //   artist: 'Imagine Dragons',
    //   imageUrl: 'https://images.pexels.com/photos/210854/pexels-photo-210854.jpeg',
    //   releaseDate: 'May 22, 2025',
    //   duration: '4:10'
    // },
    // {
    //   title: 'Dreamcatcher',
    //   artist: 'Post Malone',
    //   imageUrl: 'https://images.pexels.com/photos/167636/pexels-photo-167636.jpeg',
    //   releaseDate: 'May 16, 2025',
    //   duration: '3:38'
    // },
    // {
    //   title: 'Crystal Waves',
    //   artist: 'Sia',
    //   imageUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    //   releaseDate: 'May 10, 2025',
    //   duration: '3:57'
    // },
    // {
    //   title: 'Dark Paradise',
    //   artist: 'Lana Del Rey',
    //   imageUrl: 'https://images.pexels.com/photos/164821/pexels-photo-164821.jpeg',
    //   releaseDate: 'May 5, 2025',
    //   duration: '4:22'
    // },
    // {
    //   title: 'Sunflower',
    //   artist: 'Post Malone',
    //   imageUrl: 'https://images.pexels.com/photos/1456291/pexels-photo-1456291.jpeg',
    //   releaseDate: 'Apr 28, 2025',
    //   duration: '3:18'
    // },
    // {
    //   title: 'Blinding Lights II',
    //   artist: 'The Weeknd',
    //   imageUrl: 'https://images.pexels.com/photos/374016/pexels-photo-374016.jpeg',
    //   releaseDate: 'Apr 22, 2025',
    //   duration: '3:44'
    // },
    // {
    //   title: 'Gravity',
    //   artist: 'John Mayer',
    //   imageUrl: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg',
    //   releaseDate: 'Apr 15, 2025',
    //   duration: '4:01'
    // },
    // {
    //   title: 'Skyfall II',
    //   artist: 'Adele',
    //   imageUrl: 'https://images.pexels.com/photos/374885/pexels-photo-374885.jpeg',
    //   releaseDate: 'Apr 10, 2025',
    //   duration: '4:25'
    // },
    // {
    //   title: 'Horizons',
    //   artist: 'Coldplay',
    //   imageUrl: 'https://images.pexels.com/photos/462024/pexels-photo-462024.jpeg',
    //   releaseDate: 'Apr 5, 2025',
    //   duration: '3:36'
    // },
    // {
    //   title: 'Neon Lights',
    //   artist: 'Demi Lovato',
    //   imageUrl: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg',
    //   releaseDate: 'Mar 29, 2025',
    //   duration: '3:59'
    // },
    // {
    //   title: 'Silent Echo',
    //   artist: 'Zayn Malik',
    //   imageUrl: 'https://images.pexels.com/photos/416676/pexels-photo-416676.jpeg',
    //   releaseDate: 'Mar 24, 2025',
    //   duration: '3:41'
    // },
    // {
    //   title: 'Rhythm Divine',
    //   artist: 'Enrique Iglesias',
    //   imageUrl: 'https://images.pexels.com/photos/21014/pexels-photo.jpg',
    //   releaseDate: 'Mar 18, 2025',
    //   duration: '4:02'
    // },
    // {
    //   title: 'Firestarter',
    //   artist: 'Rihanna',
    //   imageUrl: 'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg',
    //   releaseDate: 'Mar 12, 2025',
    //   duration: '3:33'
    // },
    // {
    //   title: 'Legends Never Die',
    //   artist: 'Alan Walker',
    //   imageUrl: 'https://images.pexels.com/photos/164745/pexels-photo-164745.jpeg',
    //   releaseDate: 'Mar 6, 2025',
    //   duration: '3:48'
    // },
    // {
    //   title: 'Phoenix',
    //   artist: 'Imagine Dragons',
    //   imageUrl: 'https://images.pexels.com/photos/7130555/pexels-photo-7130555.jpeg',
    //   releaseDate: 'Mar 1, 2025',
    //   duration: '4:07'
    // }
  ];
}
