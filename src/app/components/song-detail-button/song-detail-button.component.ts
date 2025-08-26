import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MaterialModule} from '../../shared/modules/material.module';

@Component({
  selector: 'app-song-detail-button',
  imports: [
    MaterialModule
  ],
  templateUrl: './song-detail-button.component.html',
  styleUrl: './song-detail-button.component.scss'
})
export class SongDetailButtonComponent {

}
