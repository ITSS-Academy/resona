import {CommentModel} from '../../models/comment.model';

export interface CommentState {
  commentList: CommentModel[];
  comment: CommentModel;
  isLoading: boolean;
  error: any;
}
