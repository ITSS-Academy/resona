import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {OverviewComponent} from '../overview/overview.component';
import {LyricComponent} from '../lyric/lyric.component';
import {CommentsComponent} from '../comments/comments.component';
import {AlbumModel} from '../../models/album.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-three-options-button',
  imports: [MatTabsModule, CommentsComponent, LyricComponent, OverviewComponent],
  templateUrl: './three-options-button.component.html',
  styleUrl: './three-options-button.component.scss'
})

export class ThreeOptionsButtonComponent implements OnInit , OnDestroy {
  @Input() albumDetail!: AlbumModel[];

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {}

  ngOnDestroy() {}
}

