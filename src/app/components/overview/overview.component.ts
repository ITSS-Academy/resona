import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {TrackModel} from '../../models/track.model';
import {DatePipe} from '@angular/common';
import {DurationPipe} from '../../shared/pipes/duration.pipe';

@Component({
  selector: 'app-overview',
  imports: [
    MatIconModule,
    DatePipe,
    DurationPipe,
  ],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent {

  @Input() trackDetail!: TrackModel;
  @Input() totalComment!: number;
}

