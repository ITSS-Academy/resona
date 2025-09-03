import {Actions, createEffect, ofType} from '@ngrx/effects';
import {inject} from '@angular/core';
import {catchError, map, of, switchMap} from 'rxjs';
import {SearchService} from '../../services/search/search.service';
import * as searchActions from '../search/search.actions';

export const searchCategoriesEffect = createEffect(
  (actions$ = inject(Actions), searchService = inject(SearchService)) => {
    return actions$.pipe(
      ofType(searchActions.searchCategories),
      switchMap(({query}) =>
        searchService.searchCategories(query).pipe(
          map((categories) => {
            console.log(categories);
            return searchActions.searchCategoriesSuccess({categories: categories});
          }),
          catchError((error: { message: any; }) =>
            of(searchActions.searchCategoriesFailure({error})))
        )
      )
    )
  },
  {functional: true}
)
