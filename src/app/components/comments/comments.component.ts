import {AfterViewInit, Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {
  MatFormField,
  MatHint,
  MatInput,
  MatLabel,
} from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { CommentState } from '../../ngrx/comment/comment.state';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import * as CommentActions from '../../ngrx/comment/comment.actions';
import { CommentModel } from '../../models/comment.model';
import { AuthState } from '../../ngrx/auth/auth.state';
import { idToken } from '@angular/fire/auth';
import { ProfileModel } from '../../models/profile.model';
import { Observable, Subscription } from 'rxjs';
import { TrackModel } from '../../models/track.model';
import {MatButton, MatFabButton, MatIconButton} from '@angular/material/button';
import { AsyncPipe, DatePipe } from '@angular/common';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {DeleteCommentDialogComponent} from '../delete-comment-dialog/delete-comment-dialog.component';
import {deleteComment} from '../../ngrx/comment/comment.actions';

@Component({
  selector: 'app-comments',
  imports: [
    MatFormField,
    MatInput,
    MatFormField,
    MatIconModule,
    ReactiveFormsModule,
    MatIconButton,
    DatePipe,
    AsyncPipe,
  ],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss',
})
export class CommentsComponent implements OnInit, OnDestroy {
  currentUser$!: Observable<ProfileModel>;
  currentUser!: ProfileModel;
  subscriptions: Subscription[] = [];
  comments$!: Observable<CommentModel[]>;
  comments!: CommentModel[];


  @Input() trackDetail!: TrackModel;
  @Input() totalComment!: number;

  constructor(
    private store: Store<{
      comments: CommentState;
      auth: AuthState;
    }>
  ) {
  }

  ngOnInit() {

    this.comments$ = this.store.select('comments', 'commentList');

    this.currentUser$ = this.store.select('auth', 'currentUser');

    this.subscriptions.push(
      this.currentUser$.subscribe((profile) => {
        this.currentUser = profile;
      }),
      this.comments$.subscribe((comments) => {
        if (comments && comments.length > 0) {
          console.log(comments);
          this.comments = comments;
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  commentForm = new FormGroup({
    content: new FormControl(''),
  });

  createComment() {
    if (this.commentForm.valid) {
      const newComment = {
        trackId: this.trackDetail.id,
        userId: this.currentUser.uid,
        content: this.commentForm.value.content || '',
      };
      this.store.dispatch(CommentActions.createComment(newComment));
      this.store.dispatch(CommentActions.getComments({ trackId: this.trackDetail.id }));
      this.commentForm.reset();
    }
  }

  onDeleteComment(commentId: string, userId: string) {
    this.store.dispatch(
      CommentActions.deleteComment({ commentId: commentId, userId: userId })
    );
  }
}
