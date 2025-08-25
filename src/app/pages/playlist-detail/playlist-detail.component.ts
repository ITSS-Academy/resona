import { Component } from '@angular/core';
import {HeaderComponent} from "../../components/header/header.component";
import {PlayerBarComponent} from "../../components/player-bar/player-bar.component";
import {SidebarComponent} from "../../components/sidebar/sidebar.component";
import {MaterialModule} from '../../shared/modules/material.module';

@Component({
  selector: 'app-playlist-detail',
    imports: [
      MaterialModule
    ],
  templateUrl: './playlist-detail.component.html',
  styleUrl: './playlist-detail.component.scss'
})
export class PlaylistDetailComponent {

}
