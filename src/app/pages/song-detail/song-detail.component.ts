import { Component } from '@angular/core';
import {PlayerBarComponent} from '../../components/player-bar/player-bar.component';
import {AlbumCardComponent} from '../../components/album-card/album-card.component';
import {MatDivider, MatList, MatListItem} from '@angular/material/list';
import {FullAlbumDetailComponent} from '../../components/full-album-detail/full-album-detail.component';
import {QueueComponent} from '../../components/queue/queue.component';
import {PlaybarSongDetailComponent} from '../../components/queue-song-detail/playbar-song-detail.component';
import {SongDetailButtonComponent} from '../../components/song-detail-button/song-detail-button.component';
import {ThreeOptionsButtonComponent} from '../../components/three-options-button/three-options-button.component';
import {LyricComponent} from '../../components/lyric/lyric.component';
import {OverviewComponent} from '../../components/overview/overview.component';

@Component({
  selector: 'app-song-detail',
  imports: [
    PlayerBarComponent,
    AlbumCardComponent,
    MatList,
    MatListItem,
    MatDivider,
    FullAlbumDetailComponent,
    QueueComponent,
    PlaybarSongDetailComponent,
    SongDetailButtonComponent,
    ThreeOptionsButtonComponent,
    LyricComponent,
    OverviewComponent
  ],
  templateUrl: './song-detail.component.html',
  styleUrl: './song-detail.component.scss'
})
export class SongDetailComponent {

}
