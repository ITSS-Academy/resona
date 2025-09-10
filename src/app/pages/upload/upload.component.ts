import {Component, OnDestroy, OnInit} from '@angular/core';
import {MaterialModule} from '../../shared/modules/material.module';
import {Observable, Subscription, take} from 'rxjs';
import {CategoryModel} from '../../models/category.model';
import {Store} from '@ngrx/store';
import {TrackState} from '../../ngrx/track/track.state';
import {CategoryState} from '../../ngrx/category/category.state';
import * as trackActions from '../../ngrx/track/track.action';
import * as categoryActions from '../../ngrx/category/category.action';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AsyncPipe} from '@angular/common';
import {AuthState} from '../../ngrx/auth/auth.state';
import {MatDialog} from '@angular/material/dialog';
import {LoginRequiredDialogComponent} from '../../components/login-required-dialog/login-required-dialog.component';
import {ProfileModel} from '../../models/profile.model';

@Component({
  selector: 'app-upload',
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    AsyncPipe
  ],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss'
})
export class UploadComponent implements OnInit, OnDestroy {
  loading$!: Observable<boolean>
  progress$!: Observable<number>
  error$!: Observable<string | null>
  lastTrack$!: Observable<any>
  categories$!: Observable<CategoryModel[]>;
  categories: CategoryModel[] = [];
  musicDragOver = false;
  imgDragOver = false;
  lyricsDragOver = false;
  thumbnailPreview: string | null = null;

  subscriptions: Subscription[] = [];

  profile$!: Observable<ProfileModel | null>;
  private profile: ProfileModel | null = null;


  constructor(private store: Store<{
    track: TrackState,
    category: CategoryState,
    auth: AuthState,
  }>, private dialog: MatDialog
  ) {

  }

  ngOnInit() {
    this.profile$ = this.store.select('auth', 'currentUser');


    const sub = this.profile$.subscribe(user => {
      if (!user || !user.uid) {
        // disable form khi chưa login
        this.form.disable();

        const dialogRef = this.dialog.open(LoginRequiredDialogComponent, {
          width: '500px',
          height: '200px',
          disableClose: true // cho phép bấm Cancel
        });

        dialogRef.afterClosed().subscribe(() => {
          // kiểm tra lại user sau khi đóng dialog
          this.store.select('auth', 'currentUser').pipe(take(1)).subscribe(u => {
            if (!u || !u.uid) {
              this.form.disable();  // vẫn disable nếu chưa login
            } else {
              this.form.enable();   // enable khi login thành công
            }
          });
        });
      } else {
        // đã login thì enable form
        this.form.enable();
      }
    });

    this.subscriptions.push(sub);


    this.loading$ = this.store.select(state => state.track.isLoading);
    this.error$ = this.store.select(state => state.track.error);
    this.categories$ = this.store.select('category', 'categoryList');


    this.store.dispatch(categoryActions.getAllCategories());



    this.subscriptions.push(
      this.categories$.subscribe(categories => {
        this.categories = categories;
        console.log(this.categories);
      })
    );
  }

  form = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.maxLength(200)]),
    lyrics: new FormControl('', Validators.maxLength(5000)),
    artist: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    categoryId: new FormControl('', Validators.required),
    file: new FormControl<File | null>(null, Validators.required),
    thumbnail: new FormControl<File | null>(null),
    lyricsFile: new FormControl<File | null>(null)
  });

  private currentTrackId: string | null = null;
  private originalFileName: string | null = null;

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const f = input.files?.[0] ?? null;
    this.form.patchValue({file: f});
    this.originalFileName = f?.name ?? null;
  }

  onThumbnailSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const f = input.files?.[0] ?? null;
    if (f) {
      this.form.patchValue({thumbnail: f});
      this.form.get('thumbnail')?.updateValueAndValidity();

      const reader = new FileReader();
      reader.onload = () => {
        this.thumbnailPreview = reader.result as string;
      };
      reader.readAsDataURL(f);
    }

  }

  onLyricsFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result as string;
      this.form.patchValue({lyrics: text});
    };
    reader.readAsText(file);
  }

  submit() {
    if (this.form.invalid) {
      console.log('Form is invalid', this.form.errors);
      return;
    }

    const file = this.form.value.file!;
    const originalFileName = this.originalFileName || file.name;
    const thumbnail = this.form.value.thumbnail!;

    // Dispatch upload (chunk)
    this.store.dispatch(
      trackActions.uploadTrack({
        file,
        originalFileName,
        thumbnail: thumbnail,
        title: this.form.value.title || '',
        categoryId: this.form.value.categoryId || '',
        artists: this.form.value.artist || '',
        lyrics: this.form.value.lyrics || '',
      })
    );
    console.log('Form submitted', this.form.value);
  }

  // Music
  onMusicDragOver(event: DragEvent) {
    event.preventDefault();
    this.musicDragOver = true;
  }

  onMusicDragLeave(event: DragEvent) {
    event.preventDefault();
    this.musicDragOver = false;
  }

  onMusicDrop(event: DragEvent) {
    event.preventDefault();
    this.musicDragOver = false;

    const file = event.dataTransfer?.files[0];
    if (file && file.type.startsWith('audio/')) {
      this.form.patchValue({file});
    }
  }

  removeMusic(event: Event) {
    event.stopPropagation();
    this.form.patchValue({file: null});
  }

// Image
  onImgDragOver(event: DragEvent) {
    event.preventDefault();
    this.imgDragOver = true;
  }

  onImgDragLeave(event: DragEvent) {
    event.preventDefault();
    this.imgDragOver = false;
  }

  onImgDrop(event: DragEvent) {
    event.preventDefault();
    this.imgDragOver = false;

    const file = event.dataTransfer?.files[0];
    if (file && file.type.startsWith('image/')) {
      this.form.patchValue({thumbnail: file});

      const reader = new FileReader();
      reader.onload = () => {
        this.thumbnailPreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  removeImg(event: Event) {
    event.stopPropagation();
    this.form.patchValue({thumbnail: null});
    this.thumbnailPreview = null;
  }

  // Lyrics File Drag & Drop
  onLyricsDragOver(event: DragEvent) {
    event.preventDefault();
    this.lyricsDragOver = true;
  }

  onLyricsDragLeave(event: DragEvent) {
    event.preventDefault();
    this.lyricsDragOver = false;
  }

  onLyricsDrop(event: DragEvent) {
    event.preventDefault();
    this.lyricsDragOver = false;

    const file = event.dataTransfer?.files[0];
    if (file) {
      // gán file vào form để hiện chip
      this.form.patchValue({lyricsFile: file});

      // đọc nội dung text của file đưa vào lyrics
      const reader = new FileReader();
      reader.onload = () => {
        const text = reader.result as string;
        this.form.patchValue({lyrics: text});
      };
      reader.readAsText(file);
    }
  }

  removeLyricsFile(event: Event) {
    event.stopPropagation();
    this.form.patchValue({lyricsFile: null, lyrics: ''});
  }


  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
