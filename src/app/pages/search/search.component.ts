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
  // categories = [
  //   {
  //     id: 1,
  //     name: 'Pop',
  //     image: 'https://i.scdn.co/image/ab67616d0000b27308f3e7a08eb03064e6eb0af7',
  //     color: '#FF98BF',
  //     gradient: 'linear-gradient(135deg, #FF98BF 0%, #FDE2F3 100%)',
  //   },
  //   {
  //     id: 2,
  //     name: 'Rock',
  //     image: 'https://www.neatbeats.net/wp-content/uploads/2023/04/1-2.jpg',
  //     color: '#999999',
  //   },
  //   {
  //     id: 3,
  //     name: 'Hip-Hop',
  //     image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoyvm1Y_PRKQ-E30YK6RpSBbOlbTHZd0jMpw&s',
  //     color: '#1DB954',
  //     gradient: 'linear-gradient(135deg, #1DB954 0%, #000000 100%)',
  //   },
  //   {
  //     id: 4,
  //     name: 'Jazz',
  //     image: 'https://i.ytimg.com/vi/K7RmhU4m2no/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDVcburO3kiLKRR4uV1_6mGBNcMbw',
  //     color: '#6A4C93',
  //     gradient: 'linear-gradient(135deg, #6A4C93 0%, #B977D1 100%)',
  //   },
  //   {
  //     id: 5,
  //     name: 'Classical',
  //     image: 'https://f4.bcbits.com/img/a2598011156_16.jpg',
  //     color: '#F39C12',
  //   },
  //   {
  //     id: 6,
  //     name: 'R&B',
  //     image: 'https://i.scdn.co/image/ab67616d0000b273ccfa5146e54fa6a91d5bb0bd',
  //     color: '#8E44AD',
  //   },
  //   {
  //     id: 7,
  //     name: 'Electronic',
  //     image: 'https://i0.wp.com/publicseminar.org/wp-content/uploads/2018/12/shutterstock_544851574.jpg?fit=1000%2C625&ssl=1',
  //     color: '#3498DB',
  //   },
  //   {
  //     id: 8,
  //     name: 'Country',
  //     image: 'https://play-lh.googleusercontent.com/8cslWPWWj9tKoVot10Zx6JrGvSeJZ8LPFBp54GQAknYBBtfv5nRxm-ZO2GgmLX8rPg',
  //     color: '#D35400',
  //   }
  // ];

  categories$!: Observable<CategoryModel[]>;

  constructor(private store: Store<{
    search: SearchState
  }>) {
    this.categories$ = this.store.select((state) => state.search.searchCategories);
  }

  // chỉ lấy 8 cái đầu tiên
  // get topCategories() {
  //   return this.categories.slice(0, 8);
  // }


}


