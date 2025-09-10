import {Component, Input} from '@angular/core';
import {MatDivider, MatList, MatListItem} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {DatePipe, NgStyle} from '@angular/common';
import {TrackModel} from '../../models/track.model';
import {ImgConverterPipe} from '../../shared/pipes/img-converter.pipe';
import {DurationPipe} from '../../shared/pipes/duration.pipe';

@Component({
  selector: 'app-full-album-detail',
  imports: [
    MatIconModule,
    NgStyle,
    ImgConverterPipe,
  ],
  templateUrl: './full-album-detail.component.html',
  styleUrl: './full-album-detail.component.scss'
})
export class FullAlbumDetailComponent {
  @Input() trackDetail!: TrackModel;
  @Input() thumbnailUrl!: string;
}
