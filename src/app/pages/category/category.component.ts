import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {CategoryModel} from '../../models/category.model';
import {CategoryState} from '../../ngrx/category/category.state';
import * as CategoryActions from '../../ngrx/category/category.action';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  imports: [
    AsyncPipe,
    NgStyle
  ],
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit, OnDestroy {

  categories$!: Observable<CategoryModel[]>;
  subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private store: Store<{
      category: CategoryState
    }>
  ) {
    this.categories$ = this.store.select(state => state.category.categoryList);
  }

  navigateToCategoryDetail(id: string) {
    this.router.navigate(['/category-detail', id]).then();
  }

  ngOnInit() {
    this.store.dispatch(CategoryActions.getAllCategories());
    this.subscriptions.push(
      this.categories$.subscribe(categories => {
        console.log(categories);
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
