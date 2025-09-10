import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {TrackModel} from '../../models/track.model';
import {ImgConverterPipe} from '../../shared/pipes/img-converter.pipe';
import {NgStyle} from '@angular/common';
import {CategoryModel} from '../../models/category.model';
import {Router} from '@angular/router';
import {CategoryState} from '../../ngrx/category/category.state';
import {Store} from '@ngrx/store';
import * as CategoryActions from '../../ngrx/category/category.action';
import {Observable, Subscription} from 'rxjs';
import {TrackState} from '../../ngrx/track/track.state';
@Component({
  selector: 'app-small-album',
  templateUrl: './small-album.component.html',
  styleUrl: './small-album.component.scss',
  imports: [
    MatIconModule,
    ImgConverterPipe,
    NgStyle
  ]
})

export class SmallAlbumComponent implements OnInit, OnDestroy {
  trackDetail$!: Observable<TrackModel>;
  trackDetail!: TrackModel;
  category$!: Observable<CategoryModel>;
  category!: CategoryModel;
  subscription: Subscription[]=[];
  constructor(
    private router: Router,
    private store: Store<{
      category: CategoryState,
      track: TrackState,
    }>
  ) {
    this.category$ = this.store.select('category','category');
    this.trackDetail$ = this.store.select('track','trackDetail');
  }

  ngOnInit() {
    this.subscription.push(
      this.category$.subscribe((category) => {
        if(category) {
          this.category = category;
        }
      }),
      this.trackDetail$.subscribe((trackDetail) => {
        if(trackDetail) {
          this.trackDetail = trackDetail;
        }
      })
    )
  }

  ngOnDestroy() {
  }

  navigateToTrackDetail(trackId:string) {
    this.router.navigate([`/song-detail/${trackId}`]).then();
  }

  navigateToCategoryDetail(categoryId:string) {
    this.router.navigate([`/category-detail/${categoryId}`]).then();
  }
}
