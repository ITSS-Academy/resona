import {Component, OnDestroy, OnInit} from '@angular/core';
import {HeaderComponent} from "../../components/header/header.component";
import {PlayerBarComponent} from "../../components/player-bar/player-bar.component";
import {SidebarComponent} from "../../components/sidebar/sidebar.component";
import {MaterialModule} from '../../shared/modules/material.module';
import {MatDialog} from '@angular/material/dialog';
import {CreatePlaylistDialogComponent} from '../../components/create-playlist-dialog/create-playlist-dialog.component';
import {Observable, Subscription} from 'rxjs';
import {PlaylistModel} from '../../models/playlist.model';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import {PlaylistState} from '../../ngrx/playlist/playlist.state';
import * as playlistActions from '../../ngrx/playlist/playlist.action';
import {TrackModel} from '../../models/track.model';
import {AuthState} from '../../ngrx/auth/auth.state';
import {TrackState} from '../../ngrx/track/track.state';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-playlist-detail',
  imports: [
    MaterialModule,
    AsyncPipe
  ],
  templateUrl: './playlist-detail.component.html',
  styleUrls: ['./playlist-detail.component.scss']
})
export class PlaylistDetailComponent implements OnInit, OnDestroy {
  loading$!: Observable<boolean>
  error$!: Observable<string | null>
  playlistId!: string;
  playlistDetail$!: Observable<PlaylistModel[]>
  getPlaylistById$!: Observable<PlaylistModel>;

  subscriptions: Subscription[] = [];

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private store: Store<{
      playlist: PlaylistState,
      auth: AuthState,
      track: TrackState,
    }>
  ) {}

  openEditDialog() {
    this.dialog.open(CreatePlaylistDialogComponent, {
      width: '700px',
      panelClass: 'custom-dialog-container'
    });
  }

  ngOnInit() {
    this.loading$ = this.store.select(state => state.track.isLoading);
    this.error$ = this.store.select(state => state.track.error);
    this.getPlaylistById$ = this.store.select('playlist', 'playlist');

    this.subscriptions.push(
      this.route.params.subscribe(params => {
        this.playlistId = params['id'];
        this.store.dispatch(playlistActions.getPlaylistById({playlistId: this.playlistId}));
      }),
      this.getPlaylistById$.subscribe(playlists => {
        console.log(playlists);
      })
    )

  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());

  }


}
