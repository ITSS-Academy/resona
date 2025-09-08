import {inject} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as playlistActions from './playlist.action';
import {catchError, map, of, switchMap, take} from 'rxjs';
import {PlaylistService} from '../../services/playlist/playlist.service';
import {Store} from '@ngrx/store';

export const createPlaylistEffect = createEffect(
  (actions$ = inject(Actions), playlistService = inject(PlaylistService)) => {
    return actions$.pipe(
      ofType(playlistActions.createPlaylist),
      switchMap(({title, description, thumbnail, userId}) =>
        playlistService.createPlaylist(title, description, thumbnail, userId).pipe(
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


export const addTrackToPlaylistEffect = createEffect(
  (actions$ = inject(Actions), playlistService = inject(PlaylistService)) => {
    return actions$.pipe(
      ofType(playlistActions.addTrackToPlaylist),
      switchMap(({playlistId, trackId}) =>
        playlistService.addTrackToPlaylist(playlistId, trackId).pipe(
          map((playlist) => {
            console.log(playlist);
            return playlistActions.addTrackToPlaylistSuccess({playlist});
          }),
          catchError((error: { message: any; }) =>
            of(playlistActions.addTrackToPlaylistFailure({error})))
        )
      )
    )
  },
  {functional: true}
)

export const deletePlaylistEffect = createEffect(
  (actions$ = inject(Actions), playlistService = inject(PlaylistService)) => {
    return actions$.pipe(
      ofType(playlistActions.deletePlaylist),
      switchMap(({ id }) =>
        playlistService.deletePlaylist(id).pipe(
          map(() => playlistActions.deletePlaylistSuccess({ id })),
          catchError((error) =>
            of(playlistActions.deletePlaylistFailure({ error }))
          )
        )
      )
    );
  },
  { functional: true }
);

export const removeTrackFromPlaylistEffect = createEffect(
  (actions$ = inject(Actions), playlistService = inject(PlaylistService)) => {
    return actions$.pipe(
      ofType(playlistActions.removeTrackFromPlaylist),
      switchMap(({ playlistId, trackId }) =>
        playlistService.removeTrackFromPlaylist(playlistId, trackId).pipe(
          map((playlist) => playlistActions.removeTrackFromPlaylistSuccess({ playlist })),
          catchError((error) =>
            of(playlistActions.removeTrackFromPlaylistFailure({ error }))
          )
        )
      )
    );
  },
  { functional: true }
);
