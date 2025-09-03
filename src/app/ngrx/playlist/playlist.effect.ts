import {inject} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as playlistActions from './playlist.action';
import {catchError, map, of, switchMap} from 'rxjs';
import {PlaylistService} from '../../services/playlist/playlist.service';

export const createPlaylistEffect = createEffect(
  (actions$ = inject(Actions), playlistService = inject(PlaylistService)) => {
    return actions$.pipe(
      ofType(playlistActions.createPlaylist),
      switchMap(({title, description, file, userId}) =>
        playlistService.createPlaylist(title, description, file, userId).pipe(
          map((playlist) => {
            console.log(playlist);
            return playlistActions.createPlaylistSuccess({playlist: playlist});
          }),
          catchError((error: { message: any; }) =>
            of(playlistActions.createPlaylistFailure({error})))
        )
      )
    )
  },
  {functional: true}
)

