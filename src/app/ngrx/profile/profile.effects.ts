import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { catchError, map, of, switchMap } from 'rxjs';
import { ProfileService } from '../../services/profile/profile.service';
import * as ProfileActions from './profile.actions';

export const getProfileByIdEffect = createEffect(
  (actions$ = inject(Actions), profileService = inject(ProfileService)) =>
    actions$.pipe(
      ofType(ProfileActions.getProfileById),
      switchMap(({ userId }) =>
        profileService.getProfileById(userId).pipe(
          map((profile) => ProfileActions.getProfileByIdSuccess({ profile })),
          catchError((error) =>
            of(ProfileActions.getProfileByIdFailure({ error }))
          )
        )
      )
    ),
  { functional: true }
);
