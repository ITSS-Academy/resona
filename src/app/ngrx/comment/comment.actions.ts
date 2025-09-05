import {createAction, props} from '@ngrx/store';
import {CommentModel} from '../../models/comment.model';

export const getComments = createAction(
  '[Comment] Get Comments', props<{id:string}>()
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
