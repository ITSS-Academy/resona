import {Component, Input} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MaterialModule} from '../../shared/modules/material.module';
import {TrackModel} from '../../models/track.model';
import {Store} from '@ngrx/store';
import {PlayState} from '../../ngrx/play/play.state';
import * as PlayActions from '../../ngrx/play/play.action';
import {AsyncPipe} from '@angular/common';
import {Observable, Subscription} from 'rxjs';
import * as TrackActions from '../../ngrx/track/track.action';

@Component({
  selector: 'app-song-detail-button',
  imports: [
    MaterialModule,
    AsyncPipe
  ],
  templateUrl: './song-detail-button.component.html',
  styleUrl: './song-detail-button.component.scss'
})
export class SongDetailButtonComponent {
  @Input() trackDetail!: TrackModel;

  constructor(

    private store: Store<{
      play: PlayState,
    }>
  ) {

  }

  onPlayTrack(track: TrackModel) {
    console.log('Playing track:', track);
    this.store.dispatch(PlayActions.setTrack({track}));
  }
}
