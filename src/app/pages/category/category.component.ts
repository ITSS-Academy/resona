import { Component, OnDestroy, OnInit } from '@angular/core';
import { MusicGenresService } from '../../service/music-genres.service';
import { Router } from '@angular/router';
import { MusicGenresModel } from '../../models/musicGenres.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  imports: [],
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent {

  musicGenres: MusicGenresModel[] = [];

  constructor(
    private router: Router,
    private musicGenresService: MusicGenresService
  ) {
    this.musicGenres = this.musicGenresService.categories;
    console.log(this.musicGenres);
  }

  navigateToCategoryDetail(id: number) {
    this.router.navigate(['/category-detail', id]).then();
  }

  ngOnInit() {}

  ngOnDestroy() {}
}
