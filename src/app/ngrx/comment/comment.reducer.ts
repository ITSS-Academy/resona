import {CommentState} from './comment.state';
import * as CommentActions from './comment.actions';
import {CommentModel} from '../../models/comment.model';
import {createReducer, on} from '@ngrx/store';

export const initialCommentState: CommentState = {
  commentList: <CommentModel[]>[],
  comment: <CommentModel>{},
  message: '',
  isLoading: false,
  error: null
}

export const commentReducer = createReducer(
  initialCommentState,
  on(CommentActions.getComments, (state, {type,trackId})=>{
    console.log(type);
    return {
      ...state,
      isLoading: true,
      error: null,
    }
  }),

  on(CommentActions.getCommentsSuccess, (state, {type, comments})=>{
    console.log(type);
    return {
      ...state,
      commentList: comments,
      isLoading: false,
    }
  }),

  on(CommentActions.getCommentsFailure, (state, {type, error})=>{
    console.log(type);
    return {
      ...state,
      isLoading: false,
      error: error,
    }
  }),

  on(CommentActions.createComment, (state, {type, trackId,userId, content})=>{
    console.log(type);
    return {
      ...state,
      isLoading: true,
      error: null,
    }
  }),

  on(CommentActions.createCommentSuccess, (state, {type, comment})=>{
    console.log(type);
    return {
      ...state,
      comment: comment,
      commentList: [...state.commentList, comment],
      isLoading: false,
    }
  }),

  on(CommentActions.createCommentFailure, (state, {type, error})=>{
    console.log(type);
    return {
      ...state,
      isLoading: false,
      error: error,
    }
  }),

  on(CommentActions.deleteComment, (state, {type, commentId, userId})=>{
    console.log(type);
    return {
      ...state,
      isLoading: true,
      error: null,
    }
  }),

  on(CommentActions.deleteCommentSuccess, (state, { type, message, commentId }) => {
    console.log(type);
    return {
      ...state,
      commentList: state.commentList.filter(comment => comment.id !== commentId),
      message: message,
      isLoading: false,
    };
  }),

  on(CommentActions.deleteCommentFailure, (state, {type, error})=>{
    console.log(type);
    return {
      ...state,
      isLoading: false,
      error: error,
    }
  }),

)
