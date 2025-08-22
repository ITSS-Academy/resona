import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MaterialModule} from './shared/modules/material.module';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {HeaderComponent} from './components/header/header.component';
import {PlayerBarComponent} from './components/player-bar/player-bar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MaterialModule, SidebarComponent, HeaderComponent, PlayerBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'resona';
}
