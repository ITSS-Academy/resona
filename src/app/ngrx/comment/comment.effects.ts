import {Actions, createEffect, ofType} from '@ngrx/effects';
import {inject} from '@angular/core';
import {CommentService} from '../../services/comment/comment.service';
import {catchError, map, of, switchMap} from 'rxjs';
import * as CommentActions from './comment.actions';

export const getCommentsEffect = createEffect(
  (actions$ = inject(Actions), commentService = inject(CommentService)) => {
    return actions$.pipe(
      ofType(CommentActions.getComments),
      switchMap((action) =>
        commentService.getComments(action.trackId).pipe(
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

export const deleteCommentEffect = createEffect(
  (actions$ = inject(Actions), commentService = inject(CommentService)) => {
    return actions$.pipe(
      ofType(CommentActions.deleteComment),
      switchMap((action) =>
        commentService.deleteComment(action.commentId, action.userId).pipe(
          map((response: any) =>
            CommentActions.deleteCommentSuccess({
              message: typeof response === 'string' ? response : response.message,
              commentId: action.commentId
            })
          ),
          catchError((error: {message: any}) =>
            of(CommentActions.deleteCommentFailure({error}))
          )
        )
      )
    );
  },
  {functional: true}
);
