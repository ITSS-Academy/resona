import { Component } from '@angular/core';
import {QueueComponent} from '../../components/queue/queue.component';
import {LyricComponent} from '../../components/lyric/lyric.component';
import {SmallAlbumComponent} from '../../components/small-album/small-album.component';

@Component({
  selector: 'app-category',
  imports: [
    SmallAlbumComponent,
    LyricComponent
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {

}
