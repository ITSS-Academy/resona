import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import {combineLatest, map, Observable, Subscription, take} from 'rxjs';
import {CategoryModel} from '../../models/category.model';
import {TrackModel} from '../../models/track.model';
import {CategoryState} from '../../ngrx/category/category.state';
import * as CategoryActions from '../../ngrx/category/category.action';
import {AsyncPipe, NgIf} from '@angular/common';
import {MaterialModule} from '../../shared/modules/material.module';
import {PlaylistMusicTabComponent} from '../../components/playlist-music-tab/playlist-music-tab.component';
import {PlaylistDetailButtonComponent} from '../../components/playlist-detail-button/playlist-detail-button.component';
import {AuthState} from '../../ngrx/auth/auth.state';
import * as QueueActions from '../../ngrx/queue/queue.actions';
import {TrackState} from '../../ngrx/track/track.state';
import * as TrackActions from '../../ngrx/track/track.action';
import {MusicTabComponent} from '../../components/music-tab/music-tab.component';
import {MatIconModule} from '@angular/material/icon';
import {Actions, ofType} from '@ngrx/effects';
import {CategoryMusicTabComponent} from '../../components/category-music-tab/category-music-tab.component';
import {FavoriteState} from '../../ngrx/favorite/favorite.state';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss'],
  standalone: true,
  imports: [
    AsyncPipe,
    MaterialModule,
    PlaylistDetailButtonComponent,
    CategoryMusicTabComponent,
    MusicTabComponent,
  ],
})
export class CategoryDetailComponent implements OnInit, OnDestroy {
  categoryId!: string;
  categoryDetail$!: Observable<CategoryModel | null>;
  tracks$!: Observable<TrackModel[] | undefined>;
  categoryName: string = '';
  userId!: string;
  isLoading$!: Observable<boolean>;

  private subscriptions = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private store: Store<{ category: CategoryState; auth: AuthState, favorite: FavoriteState }>,
    private actions$: Actions
  ) {
  }

  ngOnInit() {
    const authSub = this.store
      .select((state) => state.auth.currentUser)
      .subscribe((user) => {
        this.userId = user?.id;
      });
    this.subscriptions.add(authSub);

    const routeSub = this.route.params.subscribe((params) => {
      this.categoryId = params['id'];
      if (this.categoryId) {
        this.store.dispatch(
          CategoryActions.getCategoryDetails({categoryId: this.categoryId})
        );

        this.categoryDetail$ = this.store.select(
          (state) => state.category.category
        );

        this.isLoading$ = this.store.select(
          (state) => state.category.isGetCategoriesLoading
        );

        this.tracks$ = combineLatest([
          this.categoryDetail$.pipe(map((c) => c?.tracks || [])),
          this.store.select((state) => state.favorite.playlist?.tracks || []),
        ]).pipe(
          map(([tracks, favoriteTracks]) =>
            tracks.map((track) => ({
              ...track,
              isFavorite: favoriteTracks.some((fav) => fav.id === track.id),
            }))
          )
        );
        const categoryNameSub = this.categoryDetail$.subscribe((c) => {
          this.categoryName = c?.name || '';
        });
        this.subscriptions.add(categoryNameSub);
      }
    });

    this.subscriptions.add(routeSub);
  }

  addAllToQueue() {
    if (this.userId && this.categoryId) {
      this.store.dispatch(
        QueueActions.addCategoryToQueue({
          userId: this.userId,
          categoryId: this.categoryId,
        })
      );

      this.actions$.pipe(
        ofType(QueueActions.addCategoryToQueueSuccess),
        take(1)
      ).subscribe(() => {
        this.store.dispatch(QueueActions.getQueueByUser({userId: this.userId}));
      });
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
