import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {QueueModel} from '../../models/queue.model';
import {ImgConverterPipe} from '../../shared/pipes/img-converter.pipe';
import {MatIconButton} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {QueueState} from '../../ngrx/queue/queue.state';
import * as QueueActions from '../../ngrx/queue/queue.actions';
import {Store} from '@ngrx/store';
import {AuthState} from '../../ngrx/auth/auth.state';
import {Observable, Subscription} from 'rxjs';
import {ProfileModel} from '../../models/profile.model';
@Component({
  selector: 'app-queue-song-detail',
  imports: [
    ImgConverterPipe,
    MatIconButton,
    MatIconModule
  ],
  templateUrl: './queue-song-detail.component.html',
  styleUrl: './queue-song-detail.component.scss'
})
export class QueueSongDetailComponent implements OnInit, OnDestroy {
  @Input() queue!: QueueModel;

  currentUser$!: Observable<ProfileModel>;
  currentUser!: ProfileModel;
  subscription: Subscription[]=[];
  constructor(
    private store:Store<{
      queue: QueueState,
      auth: AuthState,
    }>
  ) {
    this.currentUser$ = this.store.select('auth', 'currentUser');
  }

  ngOnInit() {
    this.subscription.push(
      this.currentUser$.subscribe(profile => {
        if (profile) {
          this.currentUser = profile;
        }
      }),
    )
  }

  ngOnDestroy() {
    this.subscription.forEach(sub => sub.unsubscribe());
  }

  async removeTrackFromQueue() {
    this.store.dispatch(QueueActions.removeTrackFromQueue({userId: this.currentUser.id, trackId: this.queue.track.id}));
    await new Promise(resolve => setTimeout(resolve, 100));
    this.store.dispatch(QueueActions.getQueueByUser({userId: this.currentUser.id}));
  }

}
