import { Component } from '@angular/core';
import {PlayerBarComponent} from '../../components/player-bar/player-bar.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  imports: [
    MatIconModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
