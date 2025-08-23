import { Component } from '@angular/core';
import {PlayerBarComponent} from '../../components/player-bar/player-bar.component';

@Component({
  selector: 'app-home',
  imports: [
    PlayerBarComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
