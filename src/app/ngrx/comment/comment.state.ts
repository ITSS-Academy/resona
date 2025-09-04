import {CommentModel} from '../../models/comment.model';

export interface CommentState {
  commentList: CommentModel[];
  comment: CommentModel;
  totalComments: number;
  isLoading: boolean;
  error: any;
}
