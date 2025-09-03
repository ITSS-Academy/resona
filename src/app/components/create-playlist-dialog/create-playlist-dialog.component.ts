import {Component, OnDestroy, OnInit} from '@angular/core';
import {MaterialModule} from '../../shared/modules/material.module';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {PlaylistService} from '../../services/playlist/playlist.service';
import {PlaylistState} from '../../ngrx/playlist/playlist.state';
import {Store} from '@ngrx/store';
import * as playlistActions from '../../ngrx/playlist/playlist.action';
import {createPlaylist} from '../../ngrx/playlist/playlist.action';
import {AuthState} from '../../ngrx/auth/auth.state';
import {ProfileModel} from '../../models/profile.model';
import {Observable, Subscription} from 'rxjs';
import {loginFailure} from '../../ngrx/auth/auth.actions';

@Component({
  selector: 'app-create-playlist-dialog',
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './create-playlist-dialog.component.html',
  styleUrl: './create-playlist-dialog.component.scss',

})
export class CreatePlaylistDialogComponent implements OnInit, OnDestroy {
  currentUser$!: Observable<ProfileModel>
  currentUser!: ProfileModel
  subscriptions: Subscription[] = [];

  constructor(
    private store: Store<{
      auth: AuthState,
      playlist: PlaylistState
    }>
  ) {
    this.currentUser$ = this.store.select('auth', 'currentUser')
  }

  ngOnInit() {
    this.subscriptions.push(
      this.currentUser$.subscribe(user => {
        this.currentUser = user;
        console.log('Current User in CreatePlaylistDialog:', this.currentUser);
      })
    )
  }

  form = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    description: new FormControl(''),
    file: new FormControl<File | null>(null, Validators.required),
  });

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input?.files && input.files.length > 0) {
      this.form.patchValue({file: input.files[0]});
    }
  }

  createPlaylist() {
    if (this.form.invalid || !this.currentUser) return;

    const {title, description, file} = this.form.value;
    const userId = this.currentUser.uid;

    this.store.dispatch(
      createPlaylist({
        title: title!,
        description: description ?? '',
        file: file!,
        userId: userId,
      })
    );

    this.form.reset();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
