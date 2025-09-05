import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { TrackModel } from '../../models/track.model';
import { AsyncPipe } from '@angular/common';
import { TrackState } from '../../ngrx/track/track.state';
import * as TrackActions from '../../ngrx/track/track.action';
import { ImgConverterPipe } from '../../shared/pipes/img-converter.pipe';
import { CategoryModel } from '../../models/category.model';
import { CategoryState } from '../../ngrx/category/category.state';
import * as CategoryActions from '../../ngrx/category/category.action';

@Component({
  selector: 'app-category-detail',
  standalone: true,
  templateUrl: './category-detail.component.html',
  imports: [AsyncPipe, ImgConverterPipe],
  styleUrls: ['./category-detail.component.scss'],
})
export class CategoryDetailComponent implements OnInit, OnDestroy {
  tracks$!: Observable<TrackModel[]>;
  tracks: TrackModel[] = [];
  subscriptions: Subscription[] = [];
  thumbnail: string = '';
  category$!: Observable<CategoryModel>;
  category!: CategoryModel;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<{
      category: CategoryState;
      track: TrackState;
    }>
  ) {
    const { id } = this.activatedRoute.snapshot.params;

    this.store.dispatch(TrackActions.getTrackByCategoryId({ categoryId: id }));
    this.store.dispatch(CategoryActions.getCategoryDetails({ categoryId: id }));

    this.tracks$ = this.store.select('track', 'tracks');
    this.category$ = this.store.select('category', 'category');

    // If you have a selector for category, use it here
    // this.category$ = this.store.select(selectCategory);
  }

  ngOnInit() {
    this.subscriptions.push(
      this.tracks$.subscribe((tracks) => {
        this.tracks = tracks;
      }),
      this.category$.subscribe((category) => {
        this.category = category;
      })
    );
    const categoryId = this.activatedRoute.snapshot.params['id'];
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
