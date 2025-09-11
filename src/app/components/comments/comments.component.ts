import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {
  MatFormField,
  MatInput,
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
import {MatIconButton} from '@angular/material/button';
import { AsyncPipe, DatePipe } from '@angular/common';
import {TrackState} from '../../ngrx/track/track.state';
import {CategoryModel} from '../../models/category.model';
import {CategoryState} from '../../ngrx/category/category.state';

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
  trackDetail$!: Observable<TrackModel>;
  trackDetail!: TrackModel;
  totalComment: number = 0;

  constructor(
    private store: Store<{
      comments: CommentState;
      auth: AuthState;
      track : TrackState;
    }>
  ) {
    this.comments$ = this.store.select('comments', 'commentList');
    this.currentUser$ = this.store.select('auth', 'currentUser');
    this.trackDetail$ = this.store.select('track', 'trackDetail');
  }

  ngOnInit() {

    this.subscriptions.push(
      this.currentUser$.subscribe((profile) => {
        if (profile.id) {
          this.currentUser = profile;
        }
      }),
      this.comments$.subscribe((comments) => {
        if (comments) {
          console.log(comments);
          this.comments = comments;
          this.totalComment = this.comments.length;
        }
      }),
      this.trackDetail$.subscribe((track) => {
        if (track) {
          this.trackDetail = track;
        }
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  commentForm = new FormGroup({
    content: new FormControl(''),
  });

  async createComment() {
    if (this.commentForm.valid) {
      const newComment = {
        trackId: this.trackDetail.id,
        userId: this.currentUser.id,
        content: this.commentForm.value.content || '',
      };
      this.store.dispatch(CommentActions.createComment(newComment));
      this.commentForm.reset();
    }
    await new Promise(resolve => setTimeout(resolve, 300));
    this.store.dispatch(CommentActions.getComments({ trackId: this.trackDetail.id }));
  }

  async onDeleteComment(commentId: string, userId: string) {
    this.store.dispatch(
      CommentActions.deleteComment({ commentId: commentId, userId: userId })
    );
    await new Promise(resolve => setTimeout(resolve, 300));
    this.store.dispatch(CommentActions.getComments({ trackId: this.trackDetail.id }));
  }
}
