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
import {ProfileState} from '../../ngrx/profile/profile.state';
import * as ProfileActions from '../../ngrx/profile/profile.actions';

@Component({
  selector: 'app-song-detail',
  imports: [
    FullAlbumDetailComponent,
    SongDetailButtonComponent,
    ThreeOptionsButtonComponent,
    MatProgressSpinnerModule,
  ],
  templateUrl: './song-detail.component.html',
  styleUrl: './song-detail.component.scss'
})
export class SongDetailComponent implements OnInit , OnDestroy{
  subscription: Subscription[]=[];
  isLoadingTrack$!: Observable<boolean>;
  isLoadingTrack!: boolean

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<{
      comments: CommentState,
      track: TrackState,
      profile: ProfileState,
    }>
  ) {
    let {id} = this.activatedRoute.snapshot.params;
    console.log(id);

    this.store.dispatch(CommentActions.getComments({trackId: id}));
    this.store.dispatch(TrackActions.getTrackById({id: id}));
    this.store.dispatch(TrackActions.getThumbnailBasedOnTrackId({id: id}));
    this.store.dispatch(TrackActions.getLyricsByTrackId({id: id}));
    this.store.dispatch(TrackActions.getTracksBySameArtist({trackId:id}))
    this.store.dispatch(CategoryActions.getCategoryDetailByTrackId({trackId: id}));
    this.store.dispatch(ProfileActions.getProfileByTrackId({trackId: id}))

    this.isLoadingTrack$ = this.store.select('track', 'isLoading');

  }

  ngOnInit(): void {
    this.subscription.push(
      this.isLoadingTrack$.subscribe(isLoadingTrack$ => {
        if (isLoadingTrack$) {
          this.isLoadingTrack = false;
        }
      })
    )
  }

  ngOnDestroy() {
    this.subscription.forEach(subscription => subscription.unsubscribe());
  }

}
