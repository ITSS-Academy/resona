import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {MatFabButton} from "@angular/material/button";
import {MaterialModule} from '../../shared/modules/material.module';
import * as PlaylistActions from '../../ngrx/playlist/playlist.action';
import {Observable, Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {PlaylistState} from '../../ngrx/playlist/playlist.state';
import {TrackState} from '../../ngrx/track/track.state';
import * as playlistActions from '../../ngrx/playlist/playlist.action';
import {AuthState} from '../../ngrx/auth/auth.state';
import {ActivatedRoute, Router} from '@angular/router';
import {PlaylistModel} from '../../models/playlist.model';

@Component({
  selector: 'app-playlist-detail-button',
  imports: [
    MatFabButton,
    MaterialModule
  ],
  templateUrl: './playlist-detail-button.component.html',
  styleUrl: './playlist-detail-button.component.scss'
})
export class PlaylistDetailButtonComponent implements OnInit, OnDestroy {
  @Input() playlistId!: string;
  @Output() addAllToQueue = new EventEmitter<void>();

  playlists$!: Observable<PlaylistModel[]>;
  playlists: PlaylistModel[] = [];

  isLoading$!: Observable<boolean>;
  error$!: Observable<string | null>;

  subscriptions: Subscription[] = [];

  constructor(
    private store: Store<{ playlist: PlaylistState }>,
    private router: Router
  ) {
  }

  ngOnInit() {

    this.playlists$ = this.store.select('playlist', 'playlists');
    this.isLoading$ = this.store.select((state) => state.playlist.isLoading);
    this.error$ = this.store.select((state) => state.playlist.error);

    this.subscriptions.push(
      this.playlists$.subscribe((playlists) => {
        this.playlists = playlists;
        console.log('Playlists:', playlists);
      })
    );
  }

  onAddAllToQueue() {
    this.addAllToQueue.emit();
  }

  deletePlaylist() {
    console.log('Playlist ID to delete:', this.playlistId);
    if (!this.playlistId) return;

    this.store.dispatch(playlistActions.deletePlaylist({id: this.playlistId}));
    console.log('Dispatch deletePlaylist with ID:', this.playlistId);
    this.router.navigate(['/profile']);
  }

  navigateToProfile() {

  }


  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

}
