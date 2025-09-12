import {Actions, createEffect, ofType} from '@ngrx/effects';
import {inject} from '@angular/core';
import {catchError, map, of, switchMap} from 'rxjs';
import {SearchService} from '../../services/search/search.service';
import * as SearchActions from './search.actions';

export const searchCategoriesEffect = createEffect(
  (actions$ = inject(Actions), searchService = inject(SearchService)) => actions$.pipe(
    ofType(SearchActions.searchCategories),
    switchMap(({query}) =>
      searchService.searchCategories(query).pipe(
        map(categories => SearchActions.searchCategoriesSuccess({categories})),
        catchError(error => of(SearchActions.searchCategoriesFailure({error})))
      )
    )
  ),
  {functional: true}
);

// Playlist Search
export const searchPlaylistsEffect = createEffect(
  (actions$ = inject(Actions), searchService = inject(SearchService)) => actions$.pipe(
    ofType(SearchActions.searchPlaylists),
    switchMap(({query}) =>
      searchService.searchPlaylists(query).pipe(
        map(playlists => SearchActions.searchPlaylistsSuccess({playlists})),
        catchError(error => of(SearchActions.searchPlaylistsFailure({error})))
      )
    )
  ),
  {functional: true}
);

// Profile (User) Search
export const searchProfilesEffect = createEffect(
  (actions$ = inject(Actions), searchService = inject(SearchService)) => actions$.pipe(
    ofType(SearchActions.searchProfiles),
    switchMap(({query}) =>
      searchService.searchProfiles(query).pipe(
        map(profiles => SearchActions.searchProfilesSuccess({profiles})),
        catchError(error => of(SearchActions.searchProfilesFailure({error})))
      )
    )
  ),
  {functional: true}
);

// Track Search
export const searchTracksEffect = createEffect(
  (actions$ = inject(Actions), searchService = inject(SearchService)) => actions$.pipe(
    ofType(SearchActions.searchTracks),
    switchMap(({query}) =>
      searchService.searchTracks(query).pipe(
        map(tracks => SearchActions.searchTracksSuccess({tracks})),
        catchError(error => of(SearchActions.searchTracksFailure({error})))
      )
    )
  ),
  {functional: true}
);
