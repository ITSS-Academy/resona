import { Injectable } from '@angular/core';
import {MoodPlaylistModel} from '../../models/moodPlaylist.model';

@Injectable({
  providedIn: 'root'
})
export class MoodPlaylistService {
  playlists: MoodPlaylistModel[] = [
    { name: 'new release', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_qdwqmrlW8QRzFWnQzZ6Su3uBlsTH9erGYA&s', tracks: 25 },
    { name: 'popular', imageUrl: 'https://www.singulart.com/blog/wp-content/uploads/2023/10/famous-portrait-paintings-u3.jpg', tracks: 18 },
  ];
}
