import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {OverviewComponent} from '../overview/overview.component';
import {LyricComponent} from '../lyric/lyric.component';
import {CommentsComponent} from '../comments/comments.component';
import {AlbumModel} from '../../models/album.model';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {CommentState} from '../../ngrx/comment/comment.state';
import {Observable, Subscription} from 'rxjs';
import {CommentModel} from '../../models/comment.model';
import * as CommentActions from '../../ngrx/comment/comment.actions';

@Component({
  selector: 'app-three-options-button',
  imports: [MatTabsModule, CommentsComponent, LyricComponent, OverviewComponent],
  templateUrl: './three-options-button.component.html',
  styleUrl: './three-options-button.component.scss'
})

export class ThreeOptionsButtonComponent{
  @Input() albumDetail!: AlbumModel[];
  constructor(
  ) {
  }
}

