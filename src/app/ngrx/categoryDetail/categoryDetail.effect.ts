import {inject} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {CategoryService} from '../../services/category/category.service';
import * as CategoryDetailActions from './categoryDetail.action';
import {catchError, map, of, switchMap} from 'rxjs';

export const getCategoryDetailEffect = createEffect(
  (actions$ = inject(Actions), categoryService = inject(CategoryService)) => {
    return actions$.pipe(
      ofType(CategoryDetailActions.getCategoryDetail),
      switchMap(action =>
        categoryService.getCategoryDetails(action.categoryId).pipe(
          map(category => CategoryDetailActions.getCategoryDetailSuccess({tracks: category.tracks})),
          catchError(error => of(CategoryDetailActions.getCategoryDetailFailure({error})))
        )
      )
    );
  },
  {functional: true}
);
