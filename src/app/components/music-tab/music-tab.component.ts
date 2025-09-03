import {Component, Input} from '@angular/core';
import {MaterialModule} from '../../shared/modules/material.module';
import {TrackModel} from '../../models/track.model';
import {Store} from '@ngrx/store';
import {PlayState} from '../../ngrx/play/play.state';
import * as PlayActions from '../../ngrx/play/play.action';
import {DurationPipe} from '../../shared/pipes/duration.pipe';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-music-tab',
  imports: [
    MaterialModule,
    DurationPipe,
    DatePipe
  ],
  templateUrl: './music-tab.component.html',
  styleUrl: './music-tab.component.scss'
})
export class MusicTabComponent {
  @Input() track!: TrackModel;

  constructor(
    private store: Store<{
      play: PlayState,
    }>
  ) {
  }

  onPlayTrack(track: TrackModel) {
    console.log('Playing track:', track);
    this.store.dispatch(PlayActions.play({track}));
  }
}
