import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable, Subscription } from 'rxjs';
import { CategoryModel } from '../../models/category.model';
import { TrackModel } from '../../models/track.model';
import { CategoryState } from '../../ngrx/category/category.state';
import * as CategoryActions from '../../ngrx/category/category.action';
import { AsyncPipe } from '@angular/common';
import { MaterialModule } from '../../shared/modules/material.module';
import { PlaylistMusicTabComponent } from '../../components/playlist-music-tab/playlist-music-tab.component';
import { PlaylistDetailButtonComponent } from '../../components/playlist-detail-button/playlist-detail-button.component';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { TrackModel } from '../../models/track.model';
import { TrackState } from '../../ngrx/track/track.state';
import * as TrackActions from '../../ngrx/track/track.action';
import { CategoryModel } from '../../models/category.model';
import { CategoryState } from '../../ngrx/category/category.state';
import * as CategoryActions from '../../ngrx/category/category.action';
import { MusicTabComponent } from '../../components/music-tab/music-tab.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  imports: [MusicTabComponent, MatIconModule],
  styleUrls: ['./category-detail.component.scss'],
  standalone: true,
  imports: [
    AsyncPipe,
    MaterialModule,
    PlaylistMusicTabComponent,
    PlaylistDetailButtonComponent,
  ],
})
export class CategoryDetailComponent implements OnInit, OnDestroy {
  categoryId!: string;
  categoryDetail$!: Observable<CategoryModel | null>;
  tracks$!: Observable<TrackModel[] | undefined>;
  categoryName: string = '';

  private subscriptions = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private store: Store<{ category: CategoryState }>
  ) {}

  ngOnInit() {
    const routeSub = this.route.params.subscribe((params) => {
      this.categoryId = params['id'];
      if (this.categoryId) {
        this.store.dispatch(
          CategoryActions.getCategoryDetails({ categoryId: this.categoryId })
        );

        this.categoryDetail$ = this.store.select(
          (state) => state.category.category
        );

        this.tracks$ = this.categoryDetail$.pipe(map((c) => c?.tracks));

        const categoryNameSub = this.categoryDetail$.subscribe((c) => {
          this.categoryName = c?.name || '';
        });
        this.subscriptions.add(categoryNameSub);
      }
    });
    this.subscriptions.add(routeSub);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
