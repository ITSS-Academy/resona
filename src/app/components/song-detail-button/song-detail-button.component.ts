import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MaterialModule} from '../../shared/modules/material.module';
import {TrackModel} from '../../models/track.model';
import {Store} from '@ngrx/store';
import {PlayState} from '../../ngrx/play/play.state';
import * as PlayActions from '../../ngrx/play/play.action';
import {AsyncPipe} from '@angular/common';
import * as TrackActions from '../../ngrx/track/track.action';
import {QueueState} from '../../ngrx/queue/queue.state';
import * as QueueActions from '../../ngrx/queue/queue.actions';
import {Observable, Subscription} from 'rxjs';
import {AuthState} from '../../ngrx/auth/auth.state';
import {ProfileModel} from '../../models/profile.model';
import {TrackState} from '../../ngrx/track/track.state';
import {Router} from '@angular/router';
import {CategoryModel} from '../../models/category.model';
import {CategoryState} from '../../ngrx/category/category.state';
import {QueueModel} from '../../models/queue.model';

@Component({
  selector: 'app-song-detail-button',
  imports: [
    MaterialModule,
    AsyncPipe,
  ],
  templateUrl: './song-detail-button.component.html',
  styleUrl: './song-detail-button.component.scss'
})
export class SongDetailButtonComponent implements OnInit, OnDestroy {

  trackDetail$!: Observable<TrackModel>;
  trackDetail!: TrackModel;
  currentUser$!: Observable<ProfileModel>;
  currentUser!: ProfileModel;
  subscription: Subscription[]=[];
  queueList$!: Observable<QueueModel[]>;
  queueList!: QueueModel[];
  isAdding = false;

  categoryDetail$!: Observable<CategoryModel>;
  categoryDetail!: CategoryModel;

  isPlaying$!: Observable<boolean>;

  constructor(
    private router: Router,
    private store: Store<{
      play: PlayState,
      queue: QueueState,
      auth: AuthState,
      track: TrackState,
      category: CategoryState,
    }>
  ) {
    this.currentUser$ = this.store.select('auth', 'currentUser');
    this.categoryDetail$ = this.store.select('category', 'category');
    this.isPlaying$ = this.store.select(state => state.play.isPlaying);
    this.trackDetail$ = this.store.select('track','trackDetail');
    this.queueList$ = this.store.select('queue','queueList')
  }

  onPlayTrack(track: TrackModel) {
    console.log('Playing track:', track);
    this.store.dispatch(PlayActions.setTrack({track}));
  }

  ngOnInit() {

    this.subscription.push(
      this.currentUser$.subscribe(profile => {
        if(profile) {
          this.currentUser = profile;
        }
      }),
      this.categoryDetail$.subscribe(category => {
        if (category) {
          this.categoryDetail = category;
        }
      }),
      this.trackDetail$.subscribe(trackDetail => {
        if(trackDetail) {
          this.trackDetail = trackDetail;
        }
      }),
      this.queueList$.subscribe(queueList => {
        if(queueList) {
          this.queueList = queueList;
        }
      })
    )
  }

  ngOnDestroy() {
    this.subscription.forEach(sub => sub.unsubscribe());
  }


  async addTrackToQueue(trackId: string) {
    if (this.isAdding) return;
    console.log(this.queueList)
    const isExist = this.queueList.findIndex(track => track.track.id === this.trackDetail.id);
    if (isExist !== -1) return;
    this.isAdding = true;
    await new Promise(resolve => setTimeout(resolve, 200));
    this.store.dispatch(QueueActions.addTrackToQueue({userId: this.currentUser.id, trackId}));
    await new Promise(resolve => setTimeout(resolve, 200));
    this.store.dispatch(QueueActions.getQueueByUser({userId: this.currentUser.id}));
    this.isAdding = false;
  }

  async removeTrack(){
    this.store.dispatch(TrackActions.deleteTrack({trackId: this.trackDetail.id}) );
    await new Promise(resolve => setTimeout(resolve, 200));
    this.store.dispatch(TrackActions.getTrackByCategoryId({categoryId: this.categoryDetail.id}));
    this.router.navigate([`/category-detail/${this.categoryDetail.id}`]).then();
  }
}
