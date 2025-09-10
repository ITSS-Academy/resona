import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
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
import * as CategoryActions from '../../ngrx/category/category.action';

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
  comments$!: Observable<CommentModel[]>;
  comments: CommentModel[] = [];
  totalComment!:number;
  isLoadingTrack$!: Observable<boolean>;
  thumbnailUrl$!: Observable<string>;
  thumbnailUrl!: string;
  lyric$!: Observable<string>;
  lyric!: string;
  tracksSameArtist$!: Observable<TrackModel[]>;
  tracksSameArtist!: TrackModel[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<{
      comments: CommentState,
      track: TrackState,
    }>
  ) {
    let {id} = this.activatedRoute.snapshot.params;
    console.log(id);

    this.store.dispatch(CommentActions.getComments({trackId: id}));
    this.store.dispatch(TrackActions.getTrackById({id: id}));
    this.store.dispatch(TrackActions.getThumbnailBasedOnTrackId({id: id}));
    this.store.dispatch(TrackActions.getLyricsByTrackId({id: id}));
    this.store.dispatch(TrackActions.getTracksBySameArtist({trackId:id}))

    this.comments$ = this.store.select('comments', 'commentList');
    this.trackDetail$ = this.store.select('track', 'trackDetails');
    this.isLoadingTrack$ = this.store.select('track', 'isLoading');
    this.thumbnailUrl$ = this.store.select('track', 'thumbnailUrl');
    this.lyric$ = this.store.select('track', 'lyrics');
    this.tracksSameArtist$ = this.store.select('track','tracksSameArtist')

  }

  ngOnInit(): void {
    this.subscription.push(
      this.trackDetail$.subscribe(track=>{
        if (track) {
          this.trackDetail = track;
          console.log(this.trackDetail);
          this.store.dispatch(CategoryActions.getCategoryDetailByTrackId({trackId: this.trackDetail.id}));
        } else {
          console.log('No track detail loaded yet');
        }
      }),
      this.comments$.subscribe(comments=>{
        this.comments = comments;
        this.totalComment = this.comments.length;
      }),
      this.thumbnailUrl$.subscribe(thumbnailUrl=>{
        this.thumbnailUrl = thumbnailUrl;
      }),
      this.lyric$.subscribe(lyric=>{
        this.lyric = lyric;
      }),
      this.tracksSameArtist$.subscribe(tracksSameArtist=>{
        this.tracksSameArtist = tracksSameArtist;
        console.log(this.tracksSameArtist);
      })
    )
  }

  ngOnDestroy() {
    this.subscription.forEach(subscription => subscription.unsubscribe());
  }

}
