import {inject} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as playlistActions from './playlist.action';
import {catchError, map, of, switchMap} from 'rxjs';
import {PlaylistService} from '../../services/playlist/playlist.service';

export const createPlaylistEffect = createEffect(
  (actions$ = inject(Actions), playlistService = inject(PlaylistService)) => {
    return actions$.pipe(
      ofType(playlistActions.createPlaylist),
      switchMap(({title, thumbnailPath, description, userId}) =>
        playlistService.createPlaylist(title, thumbnailPath, description, userId).pipe(
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

export const getPlaylistsEffect = createEffect(
  (actions$ = inject(Actions), playlistService = inject(PlaylistService)) => {
    return actions$.pipe(
      ofType(playlistActions.getPlaylists),
      switchMap(({userId}) =>
        playlistService.getPlaylists(userId).pipe(
          map((playlists) => {
            console.log(playlists);
            return playlistActions.getPlaylistsSuccess({playlists});
          }),
          catchError((error: { message: any; }) =>
            of(playlistActions.getPlaylistsFailure({error})))
        )
      )
    )
  },
  {functional: true}
)



  export const getPlaylistByIdEffect = createEffect(
    (actions$ = inject(Actions), playlistService = inject(PlaylistService)) => {
      return actions$.pipe(
        ofType(playlistActions.getPlaylistById),
        switchMap(({playlistId}) =>
          playlistService.getPlaylistById(playlistId).pipe(
            map((playlist) => {
              console.log(playlist);
              return playlistActions.getPlaylistByIdSuccess({playlist});
            }),
            catchError((error: { message: any; }) =>
              of(playlistActions.getPlaylistByIdFailure({error})))
          )
        )
      )
    },
    {functional: true}
  )
