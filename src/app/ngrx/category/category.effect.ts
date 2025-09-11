import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CategoryService } from '../../services/category/category.service';
import * as categoryActions from './category.action';
import { catchError, map, of, switchMap } from 'rxjs';

export const getAllCategoriesEffect = createEffect(
  (actions$ = inject(Actions), categoryService = inject(CategoryService)) => {
    return actions$.pipe(
      ofType(categoryActions.getAllCategories),
      switchMap(() =>
        categoryService.getAllCategories().pipe(
          map((categories) => {
            console.log('API returned categories:', categories); // DEBUGGING LINE
            return categoryActions.getAllCategoriesSuccess({
              categories: categories,
            });
          }),
          catchError((error: { message: any }) =>
            of(categoryActions.getAllCategoriesFailure({ error }))
          )
        )
      )
    );
  },
  { functional: true }
);

export const getCategoryDetailsEffect = createEffect(
  (actions$ = inject(Actions), categoryService = inject(CategoryService)) => {
    return actions$.pipe(
      ofType(categoryActions.getCategoryDetails),
      switchMap((action) =>
        categoryService.getCategoryDetails(action.categoryId).pipe(
          map((category) => {
            console.log(category);
            return categoryActions.getCategoryDetailsSuccess({
              category: category,
            });
          }),
          catchError((error: { message: any }) =>
            of(categoryActions.getCategoryDetailsFailure({ error }))
          )
        )
      )
    );
  },
  { functional: true }
);

export const getTracksByCategoryEffect = createEffect(
  (actions$ = inject(Actions), categoryService = inject(CategoryService)) => {
    return actions$.pipe(
      ofType(categoryActions.getTracksByCategory),
      switchMap((action) =>
        categoryService.getTracksByCategoryId(action.categoryId).pipe(
          map((tracks) => {
            return categoryActions.getTracksByCategorySuccess({
              tracks: tracks,
            });
          }),
          catchError((error: { message: any }) =>
            of(categoryActions.getTracksByCategoryFailure({ error }))
          )
        )
      )
    );
  },
  { functional: true }
);

export const getCategoryDetailByTrackIdEffect = createEffect(
  (actions$ = inject(Actions), categoryService = inject(CategoryService)) => {
    return actions$.pipe(
      ofType(categoryActions.getCategoryDetailByTrackId),
      switchMap((action) => categoryService.getCategoryDetailByTrackId(action.trackId).pipe(
          map((category) => {
            console.log(category);
            return categoryActions.getCategoryDetailByTrackIdSuccess({category: category,});
          }),
          catchError((error: { message: any; }) =>
            of(categoryActions.getCategoryDetailByTrackIdFailure({error})))
        )
      )
    )
  },
  {functional: true}
);
