import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {OverviewComponent} from '../overview/overview.component';
import {LyricComponent} from '../lyric/lyric.component';
import {CommentsComponent} from '../comments/comments.component';
import {CommentModel} from '../../models/comment.model';
import {TrackModel} from '../../models/track.model';

@Component({
  selector: 'app-three-options-button',
  imports: [MatTabsModule, CommentsComponent, LyricComponent, OverviewComponent],
  templateUrl: './three-options-button.component.html',
  styleUrl: './three-options-button.component.scss'
})

export class ThreeOptionsButtonComponent{

}

