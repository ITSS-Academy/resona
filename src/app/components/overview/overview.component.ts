import { Component } from '@angular/core';
import {AlbumCardComponent} from '../album-card/album-card.component';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-overview',
  imports: [
    AlbumCardComponent,
    MatIconModule,
  ],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent {

}
