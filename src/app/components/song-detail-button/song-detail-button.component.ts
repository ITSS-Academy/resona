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

@Component({
  selector: 'app-song-detail-button',
  imports: [
    MaterialModule,
    AsyncPipe
  ],
  templateUrl: './song-detail-button.component.html',
  styleUrl: './song-detail-button.component.scss'
})
export class SongDetailButtonComponent implements OnInit, OnDestroy {
  @Input() trackDetail!: TrackModel;
  currentUser$!: Observable<ProfileModel>;
  currentUser!: ProfileModel;
  subscription: Subscription[]=[];

  constructor(

    private store: Store<{
      play: PlayState,
      queue: QueueState,
      auth: AuthState,
    }>
  ) {
    this.currentUser$ = this.store.select('auth', 'currentUser');
  }

  onPlayTrack(track: TrackModel) {
    console.log('Playing track:', track);
    this.store.dispatch(PlayActions.setTrack({track}));
  }

  ngOnInit() {
    this.subscription.push(
      this.currentUser$.subscribe(profile => {
        this.currentUser = profile;
      })
    )
  }

  ngOnDestroy() {
    this.subscription.forEach(sub => sub.unsubscribe());
  }

  async addTrackToQueue() {
    this.store.dispatch(QueueActions.addTrackToQueue({userId: this.currentUser.uid, trackId: this.trackDetail.id}));
    await new Promise(resolve => setTimeout(resolve, 500));
    this.store.dispatch(QueueActions.getQueueByUser({userId: this.currentUser.uid}));
  }
}
