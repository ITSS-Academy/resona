import {Component, OnDestroy, OnInit} from '@angular/core';
import {MusicGenresService} from '../../services/music-genres/music-genres.service';
import {Router} from '@angular/router';
import {MusicGenresModel} from '../../models/musicGenres.model';
import {Store} from '@ngrx/store';
import {MusicGenresState} from '../../ngrx/musicGenres/musicGenres.state';
import {Observable, Subscription} from 'rxjs';
import * as MusicGenresActions from '../../ngrx/musicGenres/musicGenres.actions';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  imports: [
    AsyncPipe
  ],
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit, OnDestroy {

  musicGenresList$!: Observable<MusicGenresModel[]>;
  subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private store: Store<{
      musicGenres: MusicGenresState
    }>
  ) {
    this.musicGenresList$ = this.store.select('musicGenres', 'musicGenres');
    this.getAllMusicGenres();
  }

  navigateToCategoryDetail(id: string) {
    this.router.navigate(['/category-detail', id]).then();
  }

  ngOnInit() {
    this.subscriptions.push(
      this.musicGenresList$.subscribe((musicGenres: MusicGenresModel[]) => {
        console.log(musicGenres);
      }),
    )
  }

  getAllMusicGenres() {
    this.store.dispatch(MusicGenresActions.getAllMusicGenres());
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
