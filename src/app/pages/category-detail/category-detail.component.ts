import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MusicGenresService} from '../../service/music-genres.service';
import {MusicGenresModel} from '../../models/musicGenres.model';
import {NgStyle} from '@angular/common';
import {AlbumCardComponent} from '../../components/album-card/album-card.component';
import {MusicGenresState} from '../../ngrx/musicGenres/musicGenres.state';
import {Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import * as MusicGenreActions from '../../ngrx/musicGenres/musicGenres.actions';

@Component({
  selector: 'app-category-detail',
  imports: [
    NgStyle,
    AlbumCardComponent
  ],
  templateUrl: './category-detail.component.html',
  styleUrl: './category-detail.component.scss'
})
export class CategoryDetailComponent implements OnInit , OnDestroy{

  specificMusicGenre$!: Observable<MusicGenresModel>;
  subscription: Subscription[] = [];
  specificMusicGenre!: MusicGenresModel;

  constructor(
    private activatedRoute: ActivatedRoute,
    private musicGenresService: MusicGenresService,
    private store:Store<{
      musicGenres: MusicGenresState
    }>
  ) {
    let {id} = this.activatedRoute.snapshot.params;
    console.log(id);
    this.specificMusicGenre$ = this.store.select('musicGenres', 'specificMusicGenre');
    this.store.dispatch(MusicGenreActions.getSpecificMusicGenre({id:id}));
  }

  ngOnInit() {
    this.subscription.push(
      this.specificMusicGenre$.subscribe(musicGenres => {
        this.specificMusicGenre = musicGenres;
        console.log(this.specificMusicGenre);
      }),
    )
  }

  ngOnDestroy() {
    this.subscription.forEach(subscription => subscription.unsubscribe());
  }
}
