import { Component } from '@angular/core';
import {QueueSongDetailComponent} from '../queue-song-detail/queue-song-detail.component';
import {MatDrawer, MatDrawerContainer, MatDrawerContent} from '@angular/material/sidenav';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-queue',
  imports: [
    QueueSongDetailComponent,
  ],
  templateUrl: './queue.component.html',
  styleUrl: './queue.component.scss'
})
export class QueueComponent {

}
