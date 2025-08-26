import { Component } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MusicGenresService} from '../../service/music-genres.service';
import {MusicGenresModel} from '../../models/musicGenres.model';
import {NgStyle} from '@angular/common';
import {AlbumCardComponent} from '../../components/album-card/album-card.component';

@Component({
  selector: 'app-category-detail',
  imports: [
    NgStyle,
    AlbumCardComponent
  ],
  templateUrl: './category-detail.component.html',
  styleUrl: './category-detail.component.scss'
})
export class CategoryDetailComponent {

  musicGenre!:MusicGenresModel;

  constructor(
    private activatedRoute: ActivatedRoute,
    private musicGenresService: MusicGenresService,
  ) {
    let {id} = this.activatedRoute.snapshot.params;
    console.log(id);
    this.musicGenre = this.musicGenresService.getMusicGenreType(id);
    console.log(this.musicGenre);
  }
}
