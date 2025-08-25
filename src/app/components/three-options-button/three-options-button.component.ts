import {Component} from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {OverviewComponent} from '../overview/overview.component';
import {LyricComponent} from '../lyric/lyric.component';
import {CommentsComponent} from '../comments/comments.component';

@Component({
  selector: 'app-three-options-button',
  imports: [MatTabsModule, CommentsComponent, LyricComponent, OverviewComponent],
  templateUrl: './three-options-button.component.html',
  styleUrl: './three-options-button.component.scss'
})

export class ThreeOptionsButtonComponent {

}

