import { Component } from '@angular/core';
import {SidebarComponent} from '../../components/sidebar/sidebar.component';
import {HeaderComponent} from '../../components/header/header.component';
import {PlayerBarComponent} from '../../components/player-bar/player-bar.component';
import {MaterialModule} from '../../shared/modules/material.module';

@Component({
  selector: 'app-upload',
  imports: [
    SidebarComponent,
    HeaderComponent,
    PlayerBarComponent,
    MaterialModule
  ],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss'
})
export class UploadComponent {

}
