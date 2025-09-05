import {Component, OnDestroy, OnInit} from '@angular/core';
import {MaterialModule} from '../../shared/modules/material.module';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {PlaylistService} from '../../services/playlist/playlist.service';
import {PlaylistState} from '../../ngrx/playlist/playlist.state';
import {select, Store} from '@ngrx/store';
import * as playlistActions from '../../ngrx/playlist/playlist.action';
import {createPlaylist} from '../../ngrx/playlist/playlist.action';
import {AuthState} from '../../ngrx/auth/auth.state';
import {ProfileModel} from '../../models/profile.model';
import {filter, Observable, Subscription} from 'rxjs';
import {loginFailure} from '../../ngrx/auth/auth.actions';
import {PlaylistModel} from '../../models/playlist.model';
import {Router} from '@angular/router';
import {MatDialogRef} from '@angular/material/dialog';
import {Actions, ofType} from '@ngrx/effects';

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
    private router:Router,
    private dialogRef: MatDialogRef<CreatePlaylistDialogComponent>,
    private actions$: Actions,
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
      }),
      this.actions$.pipe(
        ofType(playlistActions.createPlaylistSuccess),
        filter(action => !!action.playlist && !!action.playlist.id)
      ).subscribe(action => {
        this.router.navigate([`/playlist-detail`, action.playlist.id]);
        this.dialogRef.close();
      }),
    );
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
