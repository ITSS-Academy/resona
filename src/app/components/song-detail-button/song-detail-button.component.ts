import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {MaterialModule} from '../../shared/modules/material.module';
import {TrackModel} from '../../models/track.model';
import {Store} from '@ngrx/store';
import {PlayState} from '../../ngrx/play/play.state';
import * as PlayActions from '../../ngrx/play/play.action';
import {QueueState} from '../../ngrx/queue/queue.state';
import * as QueueActions from '../../ngrx/queue/queue.actions';
import {Observable, Subscription, take} from 'rxjs';
import {AuthState} from '../../ngrx/auth/auth.state';
import {ProfileModel} from '../../models/profile.model';
import {TrackState} from '../../ngrx/track/track.state';
import {Router} from '@angular/router';
import {CategoryModel} from '../../models/category.model';
import {CategoryState} from '../../ngrx/category/category.state';
import {QueueModel} from '../../models/queue.model';
import {AsyncPipe} from '@angular/common';
import * as TrackActions from '../../ngrx/track/track.action'
import {ProfileState} from '../../ngrx/profile/profile.state';
import * as ProfileActions from '../../ngrx/profile/profile.actions';
import * as PlaylistActions from '../../ngrx/playlist/playlist.action';
import {PlaylistState} from '../../ngrx/playlist/playlist.state';
import {PlaylistModel} from '../../models/playlist.model';
import * as FavoriteActions from '../../ngrx/favorite/favorite.action';

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
  owner$!: Observable<ProfileModel>;
  owner!: ProfileModel;
  favoriteTrack$!: Observable<TrackModel[]>;
  favoriteTrack!: TrackModel[];
  categoryDetail$!: Observable<CategoryModel>;
  categoryDetail!: CategoryModel;
  playlist$!: Observable<PlaylistModel[]>;
  playlist!: PlaylistModel[];
  isPlaying$!: Observable<boolean>;
  isPlaying!: boolean;
  isFavorite = false;

  constructor(
    private router: Router,
    private store: Store<{
      play: PlayState,
      queue: QueueState,
      auth: AuthState,
      track: TrackState,
      category: CategoryState,
      profile: ProfileState,
      playlist: PlaylistState,
    }>
  ) {
    this.currentUser$ = this.store.select('auth', 'currentUser');
    this.categoryDetail$ = this.store.select('category', 'category');
    this.isPlaying$ = this.store.select(state => state.play.isPlaying);
    this.trackDetail$ = this.store.select('track','trackDetail');
    this.queueList$ = this.store.select('queue','queueList');
    this.owner$ = this.store.select('profile','profile');
    this.playlist$ = this.store.select('playlist','playlists');
    this.favoriteTrack$ = this.store.select('track','favoriteTracks')
  }

  onPlayTrack(track: TrackModel) {
    console.log('Playing track:', track);
    this.store.dispatch(PlayActions.setTrack({track}));
  }

  ngOnInit() {

    this.subscription.push(
      this.currentUser$.subscribe(profile => {
        if(profile.id) {
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
        if (queueList) {
          this.queueList = queueList;
        }
      }),
      this.isPlaying$.subscribe(isPlaying => {
        if(isPlaying) {
          this.isPlaying = isPlaying;
        }
      }),
      this.owner$.subscribe(owner => {
        if(owner.id) {
          this.owner = owner;
        }
      }),
      this.playlist$.subscribe(playlist => {
        if(playlist) {
          this.playlist = playlist;
        }
      }),
      this.favoriteTrack$.subscribe(track => {
        if(track) {
          this.favoriteTrack = track;
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
    // await new Promise(resolve => setTimeout(resolve, 400));
    this.store.dispatch(QueueActions.addTrackToQueue({userId: this.currentUser.id, trackId}));
    await new Promise(resolve => setTimeout(resolve, 300));
    this.store.dispatch(QueueActions.getQueueByUser({userId: this.currentUser.id}));
    this.isAdding = false;
  }

  async removeTrack(){
    this.store.dispatch(TrackActions.deleteTrack({trackId: this.trackDetail.id}) );
    await new Promise(resolve => setTimeout(resolve, 500));
    this.store.dispatch(TrackActions.getTrackByCategoryId({categoryId: this.categoryDetail.id}));
    this.router.navigate([`/category-detail/${this.categoryDetail.id}`]).then();
  }

  onOpenAddToPlaylist() {
    if (this.currentUser.id) {
      this.store.dispatch(
        PlaylistActions.getPlaylists({ userId: this.currentUser.id })
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

  onFavoriteTrack(track: TrackModel) {
    if (track.id && this.currentUser.id) {
      this.store.dispatch(
        FavoriteActions.addToFavorite({
          songId: track.id,
          userId: this.currentUser.id,
        })
      );
      this.isFavorite = true;
    }
  }

}
