import {Component, Input} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {TrackModel} from '../../models/track.model';
import {ImgConverterPipe} from '../../shared/pipes/img-converter.pipe';
import {NgStyle} from '@angular/common';
import {CategoryModel} from '../../models/category.model';
@Component({
  selector: 'app-small-album',
  templateUrl: './small-album.component.html',
  styleUrl: './small-album.component.scss',
  imports: [
    MatIconModule,
    ImgConverterPipe,
    NgStyle
  ]
})

export class SmallAlbumComponent{
  @Input() track!: TrackModel;
  @Input() categoryDetail!: CategoryModel;
}
