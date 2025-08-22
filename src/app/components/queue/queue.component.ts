import { Component } from '@angular/core';
import {PlaybarSongDetailComponent} from '../queue-song-detail/playbar-song-detail.component';

@Component({
  selector: 'app-queue',
  imports: [
    PlaybarSongDetailComponent
  ],
  templateUrl: './queue.component.html',
  styleUrl: './queue.component.scss'
})
export class QueueComponent {

}
