import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {QueueSongDetailComponent} from '../queue-song-detail/queue-song-detail.component';
import {QueueModel} from '../../models/queue.model';

@Component({
  selector: 'app-queue',
  imports: [
    QueueSongDetailComponent,
  ],
  templateUrl: './queue.component.html',
  styleUrl: './queue.component.scss'
})
export class QueueComponent{
  @Input() queueList: QueueModel[] = [];

  constructor(

  ) {
  }

  ngOnInit() {

  }

  ngOnDestroy() {}
}
