import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FullAlbumDetailComponent} from '../../components/full-album-detail/full-album-detail.component';
import {SongDetailButtonComponent} from '../../components/song-detail-button/song-detail-button.component';
import {ThreeOptionsButtonComponent} from '../../components/three-options-button/three-options-button.component';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import {CommentModel} from '../../models/comment.model';
import {CommentState} from '../../ngrx/comment/comment.state';
import * as CommentActions from '../../ngrx/comment/comment.actions';
import {TrackModel} from '../../models/track.model';
import {TrackState} from '../../ngrx/track/track.state';
import * as TrackActions from '../../ngrx/track/track.action'
import {AsyncPipe} from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-song-detail',
  imports: [
    FullAlbumDetailComponent,
    SongDetailButtonComponent,
    ThreeOptionsButtonComponent,
    AsyncPipe,
    MatProgressSpinnerModule,
  ],
  templateUrl: './song-detail.component.html',
  styleUrl: './song-detail.component.scss'
})
export class SongDetailComponent implements OnInit , OnDestroy{
  subscription: Subscription[]=[];
  trackDetail$!: Observable<TrackModel>;
  trackDetail!: TrackModel;
  comment$!: Observable<CommentModel[]>;
  comment: CommentModel[] = [];
  isLoadingTrack$!: Observable<boolean>;
  totalComment$!: Observable<number>;
  totalComment!: number;
  thumbnailUrl$!: Observable<string>;
  thumbnailUrl!: string;
  lyric$!: Observable<string>;
  lyric!: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<{
      comments: CommentState,
      track: TrackState,
    }>
  ) {
    let {id} = this.activatedRoute.snapshot.params;
    console.log(id);
    this.store.dispatch(CommentActions.getComments({id: id}));
    this.store.dispatch(TrackActions.getTrackById({id: id}));
    this.store.dispatch(CommentActions.getTotalCommentBasedOnTrackId({id: id}));
    this.store.dispatch(TrackActions.getThumbnailBasedOnTrackId({id: id}));
    this.store.dispatch(TrackActions.getLyricsByTrackId({id: id}));

    this.comment$ = this.store.select('comments', 'commentList');
    // this.trackDetail$ = this.store.select('track', 'trackDetail');
    this.isLoadingTrack$ = this.store.select('track', 'isLoading');
    this.totalComment$ = this.store.select('comments', 'totalComments');
    // this.thumbnailUrl$ = this.store.select('track', 'thumbnailUrl');
    // this.lyric$ = this.store.select('track', 'lyrics');
  }

  ngOnInit(): void {
    this.subscription.push(
      this.trackDetail$.subscribe(track=>{
        this.trackDetail = track;
        console.log(this.trackDetail);
      }),
      this.comment$.subscribe(comments=>{
        this.comment = comments;
      }),
      this.totalComment$.subscribe(total=>{
        this.totalComment = total;
      }),
      this.thumbnailUrl$.subscribe(thumbnailUrl=>{
        this.thumbnailUrl = thumbnailUrl;
      }),
      this.lyric$.subscribe(lyric=>{
        this.lyric = lyric;
        console.log(this.lyric);
      }),
    )
  }

  ngOnDestroy() {
    this.subscription.forEach(subscription => subscription.unsubscribe());
  }

}
