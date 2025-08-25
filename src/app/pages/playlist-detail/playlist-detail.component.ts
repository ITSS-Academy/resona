import { Component } from '@angular/core';
import {HeaderComponent} from "../../components/header/header.component";
import {PlayerBarComponent} from "../../components/player-bar/player-bar.component";
import {SidebarComponent} from "../../components/sidebar/sidebar.component";
import {MaterialModule} from '../../shared/modules/material.module';
import {MatDialog} from '@angular/material/dialog';
import {CreatePlaylistDialogComponent} from '../../components/create-playlist-dialog/create-playlist-dialog.component';

@Component({
  selector: 'app-playlist-detail',
    imports: [
        HeaderComponent,
        PlayerBarComponent,
        SidebarComponent,
      MaterialModule
    ],
  templateUrl: './playlist-detail.component.html',
  styleUrl: './playlist-detail.component.scss'
})
export class PlaylistDetailComponent {
  constructor(private dialog: MatDialog) {}

  isFavorite: boolean = false;
  isPlay: boolean = false;

  openEditDialog() {
    this.dialog.open(CreatePlaylistDialogComponent, {
      width: '700px',
      panelClass: 'custom-dialog-container'
    });
  }

  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
  }
  togglePlay() {
    this.isPlay = !this.isPlay;
  }


}
