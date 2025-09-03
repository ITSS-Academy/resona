import {Component, OnDestroy, OnInit} from '@angular/core';
import {MaterialModule} from '../../shared/modules/material.module';
import {Observable, Subscription} from 'rxjs';
import {CategoryModel} from '../../models/category.model';
import {Store} from '@ngrx/store';
import {TrackState} from '../../ngrx/track/track.state';
import {CategoryState} from '../../ngrx/category/category.state';
import * as trackActions from '../../ngrx/track/track.action';
import * as categoryActions from '../../ngrx/category/category.action';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AsyncPipe} from '@angular/common';

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

  subscriptions: Subscription[] = [];

  constructor(private store: Store<{
    track: TrackState,
    category: CategoryState
  }>,) {

  }

  ngOnInit() {
    this.loading$ = this.store.select(state => state.track.isLoading);
    this.error$ = this.store.select(state => state.track.error);
    this.categories$ = this.store.select('category', 'categoryList');

    this.store.dispatch(categoryActions.getAllCategories());

    this.subscriptions.push(
      this.categories$.subscribe(categories => {
        if (Array.isArray(categories)) {
          categories.forEach(category => console.log('Category:', category.name));
        }
      })
    );
  }

  form = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.maxLength(200)]),
    lyrics: new FormControl('', Validators.maxLength(5000)),
    artist: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    categoryId: new FormControl('', Validators.required),
    file: new FormControl<File | null>(null, Validators.required),
    thumbnail: new FormControl<File | null>(null)
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

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
