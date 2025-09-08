import {createAction, props} from '@ngrx/store';
import {CommentModel} from '../../models/comment.model';

export const getComments = createAction(
  '[Comment] Get Comments', props<{trackId:string}>()
)

export const getCommentsSuccess = createAction(
  '[Comment] Get Comments Success', props<{comments: CommentModel[]}>()
)

export const getCommentsFailure = createAction(
  '[Comment] Get Comments Failure', props<{error: any}>()
)

export const createComment = createAction(
  '[Comment] Create Comment', props<{trackId: string, userId: string, content:string}>()
)

export const createCommentSuccess = createAction(
  '[Comment] Create Comment Success', props<{comment: CommentModel}>()
)

export const createCommentFailure = createAction(
  '[Comment] Create Comment Failure', props<{error: any}>()
)

export const deleteComment = createAction(
  '[Comment] Delete Comment', props<{commentId: string, userId: string}>()
)

export const deleteCommentSuccess = createAction(
  '[Comment] Delete Comment Success', props<{message: string, commentId: string}>()
);

export const deleteCommentFailure = createAction(
  '[Comment] Delete Comment Failure', props<{error: any}>()
)
