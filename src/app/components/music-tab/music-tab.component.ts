import {Component, Input} from '@angular/core';
import {MaterialModule} from '../../shared/modules/material.module';
import {TrackModel} from '../../models/track.model';
import {Store} from '@ngrx/store';
import {PlayState} from '../../ngrx/play/play.state';
import * as PlayActions from '../../ngrx/play/play.action';
import {DurationPipe} from '../../shared/pipes/duration.pipe';
import {DatePipe, DecimalPipe} from '@angular/common';
import {ImgConverterPipe} from '../../shared/pipes/img-converter.pipe';
import * as FavoriteActions from '../../ngrx/favorite/favorite.action';

@Component({
  selector: 'app-music-tab',
  imports: [
    MaterialModule,
    DurationPipe,
    DatePipe,
    DecimalPipe,
    ImgConverterPipe
  ],
  templateUrl: './music-tab.component.html',
  styleUrl: './music-tab.component.scss'
})
export class MusicTabComponent {
  @Input() track!: TrackModel;
  @Input() userId!: string;

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

  onFavoriteTrack(track: TrackModel) {
    if (this.userId && track.id) {
    this.store.dispatch(FavoriteActions.addToFavorite({userId: this.userId, songId: track.id}));
    }
  }

}
