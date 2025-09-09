import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {TrackModel} from '../../models/track.model';
import {DatePipe} from '@angular/common';
import {DurationPipe} from '../../shared/pipes/duration.pipe';
import {AlbumCardComponent} from '../album-card/album-card.component';

@Component({
  selector: 'app-overview',
  imports: [
    MatIconModule,
    DatePipe,
    DurationPipe,
    AlbumCardComponent,
  ],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent implements OnInit, OnDestroy {

  @Input() trackDetail!: TrackModel;
  @Input() totalComment!: number;
  @Input() tracksSameArtist!: TrackModel[];

  constructor(
  ) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }
}

