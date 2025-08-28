import {Component, Input} from '@angular/core';
import {MatDivider, MatList, MatListItem} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {AlbumModel} from '../../models/album.model';
import {NgStyle} from '@angular/common';

@Component({
  selector: 'app-full-album-detail',
  imports: [
    MatList,
    MatListItem,
    MatDivider,
    MatIconModule,
    NgStyle,
  ],
  templateUrl: './full-album-detail.component.html',
  styleUrl: './full-album-detail.component.scss'
})
export class FullAlbumDetailComponent {
  @Input() albumDetail!: AlbumModel;
}
