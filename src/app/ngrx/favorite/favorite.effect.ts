import {inject} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as FavoriteActions from './favorite.action';
import {PlaylistService} from '../../services/playlist/playlist.service';
import {catchError, map, of, switchMap} from 'rxjs';

export const addToFavoriteEffect = createEffect(
  (actions$ = inject(Actions), playlistService = inject(PlaylistService)) => {
    return actions$.pipe(
      ofType(FavoriteActions.addToFavorite),
      switchMap(({userId, songId}) =>
        playlistService.addToFavorite(userId, songId).pipe(
          map(() => FavoriteActions.addToFavoriteSuccess()),
          catchError((error: { message: any; }) =>
            of(FavoriteActions.addToFavoriteFailure({error: error.message}))
          )
        )
      )
    );
  },
  {functional: true}
);
