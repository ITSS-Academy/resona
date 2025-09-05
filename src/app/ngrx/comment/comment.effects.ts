import {Actions, createEffect, ofType} from '@ngrx/effects';
import {inject} from '@angular/core';
import {CommentService} from '../../services/comment/comment.service';
import {catchError, map, of, switchMap} from 'rxjs';
import * as CommentActions from './comment.actions';

export const getCommentEffect = createEffect(
  (actions$ = inject(Actions), commentService = inject(CommentService)) => {
    return actions$.pipe(
      ofType(CommentActions.getComments),
      switchMap((action) =>
        commentService.getComments(action.id).pipe(
          map((comments) => CommentActions.getCommentsSuccess({comments: comments})),
          catchError((error: {message: any}) =>
            of(CommentActions.getCommentsFailure({error}))
          )
        )
      )
    );
  },
  {functional: true}
);

export const createCommentEffect = createEffect(
  (actions$ = inject(Actions), commentService = inject(CommentService)) => {
    return actions$.pipe(
      ofType(CommentActions.createComment),
      switchMap((action) =>
        commentService.createComment(action.trackId, action.userId, action.content).pipe(
          map((comment) => CommentActions.createCommentSuccess({comment: comment})),
          catchError((error: {message: any}) =>
            of(CommentActions.createCommentFailure({error}))
          )
        )
      )
    );
  },
  {functional: true}
);

export const getTotalCommentBasedOnTrackIdEffect = createEffect(
  (actions$ = inject(Actions), commentService = inject(CommentService)) => {
    return actions$.pipe(
      ofType(CommentActions.getTotalCommentBasedOnTrackId),
      switchMap((action) =>
        commentService.getTotalCommentBasedOnTrackId(action.id).pipe(
          map((totalComments) => CommentActions.getTotalCommentBasedOnTrackIdSuccess({totalComments: totalComments})),
          catchError((error: {message: any}) =>
            of(CommentActions.getTotalCommentBasedOnTrackIdFailure({error}))
          )
        )
      )
    );
  },
  {functional: true}
);
