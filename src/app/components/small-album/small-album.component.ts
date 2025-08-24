import {Component} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
@Component({
  selector: 'app-small-album',
  templateUrl: './small-album.component.html',
  styleUrl: './small-album.component.scss',
  imports: [
    MatIconModule,
    MatButton
  ]
})

export class SmallAlbumComponent{
}
