import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {MatFormField, MatInput} from '@angular/material/input';
import {MatTab, MatTabGroup} from '@angular/material/tabs';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatIcon} from '@angular/material/icon';
import {MaterialModule} from '../../shared/modules/material.module';
import {CategoryComponent} from '../category/category.component';

@Component({
  selector: 'app-search',
  imports: [
    MaterialModule,
    CategoryComponent
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  categories = [
    { name: 'Pop', image: 'assets/pop.jpg', color: '#ff6b6b' },
    { name: 'Rock', image: 'assets/rock.jpg', color: '#4ecdc4' },
    { name: 'Jazz', image: 'assets/jazz.jpg', color: '#ffe66d' },
    { name: 'Hip Hop', image: 'assets/hiphop.jpg', color: '#ff6f61' },
    { name: 'EDM', image: 'assets/edm.jpg', color: '#6a4c93' },
    { name: 'Classical', image: 'assets/classical.jpg', color: '#1a535c' },
    { name: 'Country', image: 'assets/country.jpg', color: '#f7fff7' },
    {name: 'Electronic', image: 'https://source.unsplash.com/200x200/?electronic-music', color: '#3498DB' },
    {name: 'Country', image: 'https://source.unsplash.com/200x200/?country-music', color: '#D35400' },

  ];

  get topCategories() {
    return this.categories.slice(0, 8);
  }





}


