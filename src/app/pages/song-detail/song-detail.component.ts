import { Component } from '@angular/core';
import {PlayerBarComponent} from '../../components/player-bar/player-bar.component';
import {AlbumCardComponent} from '../../components/album-card/album-card.component';

@Component({
  selector: 'app-song-detail',
  imports: [
    PlayerBarComponent,
    AlbumCardComponent
  ],
  templateUrl: './song-detail.component.html',
  styleUrl: './song-detail.component.scss'
})
export class SongDetailComponent {

}
