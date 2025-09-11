import {Component, Input} from '@angular/core';
import {MatDivider, MatList, MatListItem} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {DatePipe, NgStyle} from '@angular/common';
import {TrackModel} from '../../models/track.model';
import {ImgConverterPipe} from '../../shared/pipes/img-converter.pipe';
import {DurationPipe} from '../../shared/pipes/duration.pipe';
import {TrackState} from '../../ngrx/track/track.state';
import {Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-full-album-detail',
  imports: [
    MatIconModule,
    NgStyle,
    ImgConverterPipe,
  ],
  templateUrl: './full-album-detail.component.html',
  styleUrl: './full-album-detail.component.scss'
})
export class FullAlbumDetailComponent {

  trackDetail$!: Observable<TrackModel>;
  trackDetail!: TrackModel;
  subcription: Subscription[]=[];

  constructor(
    private store:Store<{
      track: TrackState
    }>
  ) {
    this.trackDetail$ = this.store.select('track', 'trackDetail');
  }

  ngOnInit() {
    this.subcription.push(
      this.trackDetail$.subscribe(trackDetail => {
        if(trackDetail) {
          this.trackDetail = trackDetail;
          console.log(trackDetail);
        }
      }),
    )
  }

  ngOnDestroy() {
    this.subcription.forEach(sub => sub.unsubscribe());
  }

}
