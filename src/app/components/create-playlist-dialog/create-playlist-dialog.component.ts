import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
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
  // styleUrls: ['./create-playlist-dialog.component.scss'],

})
export class CreatePlaylistDialogComponent implements OnInit, OnDestroy {
  currentUser$!: Observable<ProfileModel>
  currentUser!: ProfileModel
  subscriptions: Subscription[] = [];

  isDragging = false;
  previewUrl: string | null = null;

  constructor(
    private router:Router,
    private dialogRef: MatDialogRef<CreatePlaylistDialogComponent>,
    private actions$: Actions,
    private zone: NgZone,
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

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();

      this.form.patchValue({file});
      this.form.get('file')?.updateValueAndValidity();
      reader.onload = () => {
        this.previewUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
      console.log('Selected file:', file);
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
        thumbnail: file!,
        userId: userId,
      })
    );

    this.form.reset();
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;

    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      this.handleFile(file);
    }
  }


  handleFile(file: File) {
    this.form.patchValue({ file: file });
    this.form.get('file')?.updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = () => {
      this.zone.run(() => {
        this.previewUrl = reader.result as string;
      });
    };
    reader.readAsDataURL(file);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
