import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {MatFormField, MatInput} from '@angular/material/input';
import {MatTab, MatTabGroup} from '@angular/material/tabs';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatIcon} from '@angular/material/icon';
import {MaterialModule} from '../../shared/modules/material.module';
import {CategoryComponent} from '../category/category.component';
import {Observable} from 'rxjs';
import {CategoryModel} from '../../models/category.model';
import {Store} from '@ngrx/store';
import {CategoryState} from '../../ngrx/category/category.state';
import {SearchState} from '../../ngrx/search/search.state';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-search',
  imports: [
    MaterialModule,
    CategoryComponent,
    AsyncPipe
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  categories$!: Observable<CategoryModel[]>;

  constructor(private store: Store<{
    search: SearchState
  }>) {
    this.categories$ = this.store.select((state) => state.search.searchCategories);
  }


}


