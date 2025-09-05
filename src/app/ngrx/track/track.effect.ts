import {Actions, createEffect, ofType} from '@ngrx/effects';
import {inject} from '@angular/core';
import {TrackService} from '../../services/track/track.service';
import * as trackActions from './track.action';
import {catchError, map, of, switchMap} from 'rxjs';

export const createTrackEffect = createEffect(
  (actions$ = inject(Actions), trackService = inject(TrackService)) => {
    return actions$.pipe(
      ofType(trackActions.uploadTrack),
      switchMap(({file, originalFileName, thumbnail, categoryId, title, artists, lyrics}) =>
        trackService.uploadInChunks({file, originalFileName, categoryId,}).pipe(
          switchMap((event) =>
            trackService.mergeTrack({
              trackId: event.trackId,
              originalFileName: event.trackName,
              title,
              categoryId,
              thumbnail: thumbnail,
              lyrics,
              artists: artists
            }).pipe(
              map((track) => trackActions.uploadTrackSuccess({track})),
              catchError((error) =>
                of(trackActions.uploadTrackFailure({error: error.message || 'Merge failed'}))
              )
            )
          ),
          catchError((error) =>
            of(trackActions.uploadTrackFailure({error: error.message || 'Upload failed'}))
          )
        )
      )
    );
  },
  {functional: true}
);

export const getFavoriteTracksEffect = createEffect(
  (actions$ = inject(Actions), trackService = inject(TrackService)) => {
    return actions$.pipe(
      ofType(trackActions.getFavoriteTracks),
      switchMap(({userId}) =>
        trackService.getFavouriteTracks(userId).pipe(
          map((tracks) => {
            console.log(tracks);
            return trackActions.getFavoriteTracksSuccess({tracks});
          }),
          catchError((error: { message: any; }) =>
            of(trackActions.getFavoriteTracksFailure({error: error.message})))
        )
      )
    )
  },
  {functional: true}
)


//
// export const getFavoriteTracksEffect = createEffect(
//   (actions$ = inject(Actions), trackService = inject(TrackService)) => {
//     return actions$.pipe(
//       ofType(trackActions.getFavoriteTracks),
//       switchMap(({userId}) =>
//         trackService.getFavouriteTracks(userId).pipe(
//           map((tracks) => {
//             console.log(tracks);
//             return trackActions.getFavoriteTracksSuccess({tracks});
//           }),
//           catchError((error: { message: any; }) =>
//             of(trackActions.getFavoriteTracksFailure({error: error.message})))
//         )
//       )
//     )
//   },
//   {functional: true}
// )

export const getTrackByIdEffect = createEffect(
  (actions$ = inject(Actions), trackService = inject(TrackService)) => {
    return actions$.pipe(
      ofType(trackActions.getTrackById),
      switchMap(({id}) =>
        trackService.getTrackById(id).pipe(
          map((trackDetail) => trackActions.getTrackByIdSuccess({trackDetail: trackDetail})),
          catchError((error) =>
            of(trackActions.getTrackByIdFailure({error: error.message || 'Get track by id failed'}))
          )
        )
      )
    );
  },
  {functional: true}
);

export const getThumbnailBasedOnTrackIdEffect = createEffect(
  (actions$ = inject(Actions), trackService = inject(TrackService)) => {
    return actions$.pipe(
      ofType(trackActions.getThumbnailBasedOnTrackId),
      switchMap(({id}) =>
        trackService.getThumbnailBasedOnTrackId(id).pipe(
          map((res) => trackActions.getThumbnailBasedOnTrackIdSuccess({thumbnailUrl: res.url})),
          catchError((error) =>
            of(trackActions.getThumbnailBasedOnTrackIdFailure({error: error.message || 'Get thumbnail failed'}))
          )
        )
      )
    );
  },
  {functional: true}
);


export const getLyricsByTrackIdEffect = createEffect(
  (actions$ = inject(Actions), trackService = inject(TrackService)) => {
    return actions$.pipe(
      ofType(trackActions.getLyricsByTrackId),
      switchMap(({id}) =>
        trackService.getLyricsBasedOnTrackId(id).pipe(
          map((res) => trackActions.getLyricsByTrackIdSuccess({ lyrics: res.lyrics })),
          catchError((error) =>
            of(trackActions.getLyricsByTrackIdFailure({error: error.message || 'Get lyrics failed'}))
          )
        )
      )
    );
  },
  {functional: true}
);
