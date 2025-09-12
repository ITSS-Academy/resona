import {Actions, createEffect, ofType} from '@ngrx/effects';
import {ProfileService} from '../../services/profile/profile.service';
import {inject} from '@angular/core';
import * as ProfileActions from './profile.actions'
import {catchError, map, of, switchMap} from 'rxjs';

export const getFollowersEffect = createEffect(
  (actions$ = inject(Actions), profileService = inject(ProfileService)) => {
    return actions$.pipe(
      ofType(ProfileActions.getFollowers),
      switchMap(({profileId}) =>
        profileService.getFollowers(profileId).pipe(
          map((profileList) => {
            console.log(profileList);
            return ProfileActions.getFollowersSuccess({profileList});
          }),
          catchError((error: { message: any; }) =>
            of(ProfileActions.getFollowersFailure({error: error.message})))
        )
      )
    )
  },
  {functional: true}
)

export const getProfileByIdEffect = createEffect(
  (actions$ = inject(Actions), profileService = inject(ProfileService)) =>
    actions$.pipe(
      ofType(ProfileActions.getProfileById),
      switchMap(({userId}) =>
        profileService.getProfileById(userId).pipe(
          map((profile) => ProfileActions.getProfileByIdSuccess({profile})),
          catchError((error) =>
            of(ProfileActions.getProfileByIdFailure({error}))
          )
        )
      )
    ),
  {functional: true}
);

export const followProfileEffect = createEffect(
  (actions$ = inject(Actions), profileService = inject(ProfileService)) => {
    return actions$.pipe(
      ofType(ProfileActions.followProfile),
      switchMap(({followerId, followingId}) =>
        profileService.followProfile(followerId, followingId).pipe(
          map(() => ProfileActions.followProfileSuccess()),
          catchError((error: { message: any; }) =>
            of(ProfileActions.followProfileFailure({error: error.message})))
        )
      )
    )
  },
  {functional: true}
);

export const getProfileByTrackIdEffect = createEffect(
  (actions$ = inject(Actions), profileService = inject(ProfileService)) => {
    return actions$.pipe(
      ofType(ProfileActions.getProfileByTrackId),
      switchMap(({trackId}) =>
        profileService.getProfileByTrackId(trackId).pipe(
          map((profile) => ProfileActions.getProfileByTrackIdSuccess({profile})),
          catchError((error: { message: any; }) =>
            of(ProfileActions.getProfileByTrackIdFailure({error: error.message})))
        )
      )
    )
  },
  {functional: true}
)

export const getPopularProfilesEffect = createEffect(
  (actions$ = inject(Actions), profileService = inject(ProfileService)) => {
    return actions$.pipe(
      ofType(ProfileActions.getPopularProfiles),
      switchMap(() =>
        profileService.getPopularProfiles().pipe(
          map((profileList) => ProfileActions.getPopularProfilesSuccess({profileList})),
          catchError((error: { message: any; }) =>
            of(ProfileActions.getPopularProfilesFailure({error: error.message})))
        )
      )
    )
  },
  {functional: true}
)
