import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { PlaylistService } from '../../services/playlist/playlist.service';
import * as FavoriteActions from './favorite.action';

export const getFavoritePlaylist$ = createEffect(
  (actions$ = inject(Actions), playlistService = inject(PlaylistService)) => {
    return actions$.pipe(
      ofType(FavoriteActions.getFavoritePlaylist),
      switchMap((action) =>
        playlistService.getFavoritePlaylistByUserId(action.userId).pipe(
          map((playlist: any) => {
            const mappedPlaylist = { ...playlist, tracks: playlist.track };
            delete mappedPlaylist.track;
            return FavoriteActions.getFavoritePlaylistSuccess({ playlist: mappedPlaylist });
          }),
          catchError((error) =>
            of(FavoriteActions.getFavoritePlaylistFailure({ error })),
          ),
        ),
      ),
    );
  },
  { functional: true },
);

export const addToFavorite$ = createEffect(
  (actions$ = inject(Actions), playlistService = inject(PlaylistService)) => {
    return actions$.pipe(
      ofType(FavoriteActions.addToFavorite),
      switchMap(action =>
        playlistService.addToFavorite(action.userId, action.songId).pipe(
          switchMap(() => [
            FavoriteActions.addToFavoriteSuccess(),
            FavoriteActions.getFavoritePlaylist({ userId: action.userId })
          ]),
          catchError(error => of(FavoriteActions.addToFavoriteFailure({ error })))
        )
      )
    );
  },
  { functional: true },
);
