import {Component, Input} from '@angular/core';
import {QueueModel} from '../../models/queue.model';
import {ImgConverterPipe} from '../../shared/pipes/img-converter.pipe';

@Component({
  selector: 'app-queue-song-detail',
  imports: [
    ImgConverterPipe
  ],
  templateUrl: './queue-song-detail.component.html',
  styleUrl: './queue-song-detail.component.scss'
})
export class QueueSongDetailComponent {
  @Input() queue!: QueueModel;
}
