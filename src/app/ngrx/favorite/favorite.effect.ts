import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { PlaylistService } from '../../services/playlist/playlist.service';
import * as FavoriteActions from './favorite.action';
import { TrackModel } from '../../models/track.model';
import { PlaylistModel } from '../../models/playlist.model';

export const getFavoritePlaylist$ = createEffect(
  (actions$ = inject(Actions), playlistService = inject(PlaylistService)) => {
    return actions$.pipe(
      ofType(FavoriteActions.getFavoritePlaylist),
      switchMap((action) =>
        playlistService.getFavoritePlaylistByUserId(action.userId).pipe(
          map((tracks: TrackModel[]) => {
            const favoritePlaylist: PlaylistModel = {
              id: `favorite-${action.userId}`,
              title: 'Favorite',
              description: 'Your favorite songs',
              thumbnailPath:
                'https://cynhadjnrnyzycvxcpln.supabase.co/storage/v1/object/public/playlist-thumbnail/c6b2752d-c8e6-4c01-877f-105e17735995/playlist-thumbnail.jpg',
              profile: { id: action.userId } as any, // Tạo profile giả để khớp model
              tracks: tracks,
            };
            return FavoriteActions.getFavoritePlaylistSuccess({
              playlist: favoritePlaylist,
            });
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
