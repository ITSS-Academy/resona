import { Component } from '@angular/core';
import {PlayerBarComponent} from '../../components/player-bar/player-bar.component';
import { MatIconModule } from '@angular/material/icon';
import {MusicGenresService} from '../../service/music-genres.service';
import {MusicGenresModel} from '../../models/musicGenres.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    MatIconModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  musicGenres: MusicGenresModel[] = [];

  constructor(
    private musicGenresService: MusicGenresService
  ) {
    this.musicGenres = this.musicGenresService.categories;
  }

  ngOnInit() {}

  ngOnDestroy() {}
}
