import { Component } from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  imports: [
    NgClass
  ],
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  activeTab: string = 'upload';

  openTab(tabName: string) {
    this.activeTab = tabName;
  }
}
export class UserProfileComponent {


  uploadFiles = [
    {name: 'song.mp3', size: '5MB', date: '2025-08-01'},
    {name: 'photo.jpg', size: '2MB', date: '2025-07-30'}
  ];

  playlists = [
    {name: 'Chill Vibes', count: 12, created: '2025-06-12'},
    {name: 'Workout', count: 8, created: '2025-07-01'}
  ];

  favorites = [
    {song: 'Shape of You', artist: 'Ed Sheeran', added: '2025-07-29'},
    {song: 'Blinding Lights', artist: 'The Weeknd', added: '2025-08-10'}
  ];
}
