import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import {CategoryDetailState} from '../../ngrx/categoryDetail/categoryDetail.state';
import * as CategoryDetailActions from '../../ngrx/categoryDetail/categoryDetail.action';
// import {TrackModel} from '../../models/track.model';
import {AsyncPipe, CommonModule} from '@angular/common';
import {CategoryModel} from '../../models/category.model';

@Component({
  selector: 'app-category-detail',
  standalone: true,
  templateUrl: './category-detail.component.html',
  imports: [
    CommonModule,
    AsyncPipe
  ],
  styleUrls: ['./category-detail.component.scss']
})
export class CategoryDetailComponent implements OnInit, OnDestroy {
  category$!: Observable<CategoryModel | null>;
  subscriptions: Subscription[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<{ categoryDetail: CategoryDetailState }>
  ) {
    this.category$ = this.store.select(state => state.categoryDetail.category);
  }

  ngOnInit() {
    const categoryId = this.activatedRoute.snapshot.params['id'];
    this.store.dispatch(CategoryDetailActions.getCategoryDetail({categoryId}));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}

