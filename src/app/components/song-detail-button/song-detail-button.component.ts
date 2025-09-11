import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {MaterialModule} from '../../shared/modules/material.module';
import {TrackModel} from '../../models/track.model';
import {Store} from '@ngrx/store';
import {PlayState} from '../../ngrx/play/play.state';
import * as PlayActions from '../../ngrx/play/play.action';
import {QueueState} from '../../ngrx/queue/queue.state';
import * as QueueActions from '../../ngrx/queue/queue.actions';
import {filter, Observable, Subscription} from 'rxjs';
import {AuthState} from '../../ngrx/auth/auth.state';
import {ProfileModel} from '../../models/profile.model';
import {TrackState} from '../../ngrx/track/track.state';
import {Router} from '@angular/router';
import {CategoryModel} from '../../models/category.model';
import {CategoryState} from '../../ngrx/category/category.state';
import {QueueModel} from '../../models/queue.model';
import {AsyncPipe} from '@angular/common';
import {PlaylistModel} from '../../models/playlist.model';
import {PlaylistState} from '../../ngrx/playlist/playlist.state';
import {MatSnackBar} from '@angular/material/snack-bar';
import * as PlaylistActions from '../../ngrx/playlist/playlist.action';
import {ShareSnackbarComponent} from '../share-snackbar/share-snackbar.component';
import {Actions, ofType} from '@ngrx/effects';
import * as TrackActions from '../../ngrx/track/track.action'

@Component({
  selector: 'app-song-detail-button',
  imports: [
    MaterialModule,
    AsyncPipe,
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
  currentUserId!: string;
  playlists$!: Observable<PlaylistModel[]>;

  constructor(
    private router: Router,
    private store: Store<{
      play: PlayState,
      queue: QueueState,
      auth: AuthState,
      track: TrackState,
      category: CategoryState,
      playlist: PlaylistState
    }>,
    private actions$: Actions,
  ) {
    this.currentUser$ = this.store.select('auth', 'currentUser');
    this.categoryDetail$ = this.store.select('category', 'category');
    this.isPlaying$ = this.store.select(state => state.play.isPlaying);
    this.playlists$ = this.store.select('playlist', 'playlists');
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
        this.currentUser = profile;
        this.currentUserId = profile.id;
        if(profile) {
          this.currentUser = profile;
        }
      }),
      this.categoryDetail$.subscribe(category => {
        if (category) {
          this.categoryDetail = category;
        }
      }),
      this.actions$.pipe(
        ofType(PlaylistActions.addTrackToPlaylistSuccess),
        filter(action => !!action.playlist) // chỉ nhận khi có playlist trả về
      ).subscribe(() => {
        this.openSnackBar('Track added to playlist successfully!');
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
    );
  }
  ngOnDestroy() {
    this.subscription.forEach(sub => sub.unsubscribe());
  }



    
  async addTrackToQueue(trackId: string) {
    this.store.dispatch(QueueActions.addTrackToQueue({userId: this.currentUser.id, trackId: this.trackDetail.id}));
    await new Promise(resolve => setTimeout(resolve, 500));
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

  onOpenAddToPlaylist() {
    if (this.currentUserId) {
      this.store.dispatch(
        PlaylistActions.getPlaylists({ userId: this.currentUserId })
      );
    }
  }
  onAddTrackToPlaylist(playlistId: string) {
    if (!this.trackDetail || !playlistId) return;

    this.store.dispatch(
      PlaylistActions.addTrackToPlaylist({
        playlistId,
        trackId: this.trackDetail.id,
      })
    );
  }
  private _snackBar = inject(MatSnackBar);

  durationInSeconds = 10;

  openSnackBar(content: string) {
    this._snackBar.openFromComponent(ShareSnackbarComponent, {
      data: content,
      duration: this.durationInSeconds * 1000,
    });
  }


}
