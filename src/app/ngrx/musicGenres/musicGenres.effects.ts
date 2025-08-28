import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as MusicGenresActions from '../musicGenres/musicGenres.actions';
import {MusicGenresService} from '../../service/music-genres/music-genres.service';
import {catchError, map, of, switchMap} from 'rxjs';
import {inject} from '@angular/core';

export const musicGenresEffects = createEffect(
  (action$ = inject(Actions), musicGenresService = inject(MusicGenresService)) => {
    return action$.pipe(
      ofType(MusicGenresActions.getAllMusicGenres),
      switchMap(() =>
        // Call the method on the injected service instance
        of(musicGenresService.getAllMusicGenres()).pipe(
          map((musicGenres) =>
            MusicGenresActions.getAllMusicGenresSuccess({ musicGenresList: musicGenres })
          ),
          catchError((error: any) =>
            of(MusicGenresActions.getAllMusicGenresFailure({ error }))
          )
        )
      )
    );
  },
  { functional: true }
);

export const musicGenreByIdEffects = createEffect(
  (action$ = inject(Actions), musicGenresService = inject(MusicGenresService)) => {
    return action$.pipe(
      ofType(MusicGenresActions.getSpecificMusicGenre),
      switchMap((action) =>
        of(musicGenresService.getSpecificMusicGenre(action.id)).pipe(
          map((musicGenre) =>
            MusicGenresActions.getSpecificMusicGenreSuccess({ specificMusicGenre:  musicGenre })
          ),
          catchError((error: any) =>
            of(MusicGenresActions.getSpecificMusicGenreFailure({ error }))
          )
        )
      )
    );
  },
  { functional: true }
);
