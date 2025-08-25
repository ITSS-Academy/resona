import { Component } from '@angular/core';
import {MatDivider, MatList, MatListItem} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-full-album-detail',
  imports: [
    MatList,
    MatListItem,
    MatDivider,
    MatIconModule,
  ],
  templateUrl: './full-album-detail.component.html',
  styleUrl: './full-album-detail.component.scss'
})
export class FullAlbumDetailComponent {

}
