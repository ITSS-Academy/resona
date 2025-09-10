import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {TrackModel} from '../../models/track.model';
import {DatePipe} from '@angular/common';
import {DurationPipe} from '../../shared/pipes/duration.pipe';
import {AlbumCardComponent} from '../album-card/album-card.component';
import {Observable, Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {TrackState} from '../../ngrx/track/track.state';
import {CommentModel} from '../../models/comment.model';
import {CommentState} from '../../ngrx/comment/comment.state';

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
  subscription: Subscription[] = [];
  trackDetail$!: Observable<TrackModel>;
  trackDetail!: TrackModel;
  tracksSameArtist$!: Observable<TrackModel[]>;
  tracksSameArtist: TrackModel[] = [];
  comments$!: Observable<CommentModel[]>;
  comments: CommentModel[] = [];
  totalComment!:number;

  constructor(
    private store: Store<{
      track: TrackState,
      comments: CommentState,
    }>,
  ) {
    this.trackDetail$ = this.store.select('track', 'trackDetail');
    this.tracksSameArtist$ = this.store.select('track','tracksSameArtist');
    this.comments$ = this.store.select('comments', 'commentList');
  }

  ngOnInit(): void {
    this.subscription.push(
      this.trackDetail$.subscribe(trackDetail => {
        if (trackDetail) {
          this.trackDetail = trackDetail;
        }
      }),
      this.tracksSameArtist$.subscribe(tracksSameArtist => {
        if (tracksSameArtist) {
          this.tracksSameArtist = tracksSameArtist;
        }
      }),
      this.comments$.subscribe(comments => {
        if (comments) {
          this.comments = comments;
          this.totalComment = comments.length;
        }
      })
    )
  }

  ngOnDestroy(): void {
    this.subscription.forEach((s => s.unsubscribe()) );
  }
}

