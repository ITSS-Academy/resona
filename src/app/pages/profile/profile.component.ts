import { Component } from '@angular/core';
import {MatTab, MatTabGroup, MatTabsModule} from '@angular/material/tabs';
import {
  MatList,
  MatListItem,
  MatListOption,
  MatSelectionList
} from '@angular/material/list';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  imports: [
    MatTabGroup,
    MatTab,
    MatTabsModule,
    MatList,
    MatListItem,
    MatButton,
    MatListOption,
    MatSelectionList
  ],
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  typesOfShoes: string[] = [
    'song',
  ];
  firstList = [
    { name: 'Item 1' },
    { name: 'Item 2' }
  ];
  secondList = [
    { title: 'Title A' },
    { title: 'Title B' }
  ];}


