import { Component } from '@angular/core';
import {PlaybarSongDetailComponent} from '../queue-song-detail/playbar-song-detail.component';
import {MatDrawer, MatDrawerContainer, MatDrawerContent} from '@angular/material/sidenav';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-queue',
  imports: [
    PlaybarSongDetailComponent,
    MatDrawerContainer,
    MatDrawer,
    MatDrawerContent,
    MatButton
  ],
  templateUrl: './queue.component.html',
  styleUrl: './queue.component.scss'
})
export class QueueComponent {

}
