import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as FavoriteActions from './favorite.action';
import { PlaylistService } from '../../services/playlist/playlist.service';
import {
  catchError,
  filter,
  map,
  of,
  switchMap,
  withLatestFrom,
} from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthState } from '../auth/auth.state';

export const addToFavoriteEffect = createEffect(
  (
    actions$ = inject(Actions),
    playlistService = inject(PlaylistService),
    store = inject(Store<{ auth: AuthState }>)
  ) => {
    return actions$.pipe(
      ofType(FavoriteActions.addToFavorite),
      withLatestFrom(store.select((state) => state.auth.currentUser)),
      switchMap(([{ songId }, user]) => {
        console.log('Add to favorite effect triggered.');
        console.log('Song ID:', songId);
        console.log('Current User:', user);

        if (!user) {
          console.error('User not logged in. Cannot add to favorites.');
          return of(
            FavoriteActions.addToFavoriteFailure({
              error: 'User not logged in',
            })
          );
        }

        return playlistService.addToFavorite(user.uid, songId).pipe(
          map(() => {
            console.log('Successfully added to favorites.');
            return FavoriteActions.addToFavoriteSuccess();
          }),
          catchError((error: any) => {
            console.error('Error adding to favorites:', error);
            return of(
              FavoriteActions.addToFavoriteFailure({ error: error.message })
            );
          })
        );
      })
    );
  },
  { functional: true }
);
