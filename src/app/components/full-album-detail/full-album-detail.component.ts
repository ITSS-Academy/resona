import {Component, Input} from '@angular/core';
import {MatDivider, MatList, MatListItem} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {NgStyle} from '@angular/common';
import {TrackModel} from '../../models/track.model';

@Component({
  selector: 'app-full-album-detail',
  imports: [
    MatList,
    MatListItem,
    MatIconModule,
    NgStyle,
  ],
  templateUrl: './full-album-detail.component.html',
  styleUrl: './full-album-detail.component.scss'
})
export class FullAlbumDetailComponent {
  @Input() trackDetail!: TrackModel;
}
