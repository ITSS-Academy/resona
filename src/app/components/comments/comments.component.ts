import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {MatFormField, MatHint, MatInput, MatLabel} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {Store} from '@ngrx/store';
import {CommentState} from '../../ngrx/comment/comment.state';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import * as CommentActions from '../../ngrx/comment/comment.actions';
import {CommentModel} from '../../models/comment.model';
import {AuthState} from '../../ngrx/auth/auth.state';
import {idToken} from '@angular/fire/auth';
import {ProfileModel} from '../../models/profile.model';
import {Observable, Subscription} from 'rxjs';
import {TrackModel} from '../../models/track.model';
import {MatFabButton, MatIconButton} from '@angular/material/button';
import {AsyncPipe, DatePipe} from '@angular/common';

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
  ],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss'
})
export class CommentsComponent implements OnInit , OnDestroy{

  currentUser$!: Observable<ProfileModel>;
  currentUser!: ProfileModel;
  subscriptions: Subscription[] = [];
  comment$!: Observable<CommentModel>;
  comment!: CommentModel;

  @Input() commentList!: CommentModel[];
  @Input() trackDetail!: TrackModel;
  @Input() totalComment!: number;

  constructor(
    private store:Store<{
      comment: CommentState,
      auth: AuthState,
    }>
  ) {
    this.comment$ = this.store.select('comment', 'comment');
    this.currentUser$ = this.store.select('auth', 'currentUser');
  }

  ngOnInit() {
    this.subscriptions.push(
      this.currentUser$.subscribe(profile => {
        this.currentUser = profile;
      }),
      this.comment$.subscribe(comments => {
        this.comment = comments;
      }),
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  commentForm = new FormGroup({
    content: new FormControl(''),
  });

  async createComment(){
    if(this.commentForm.valid){
      const newComment = {
        // trackId: id,
        trackId: this.trackDetail.id,
        userId: this.currentUser.uid,
        content: this.commentForm.value.content || '',
      }
      this.store.dispatch(CommentActions.createComment(newComment));
      await new Promise(resolve => setTimeout(resolve, 500));
      this.store.dispatch(CommentActions.getComments({trackId: this.trackDetail.id}));
      this.commentForm.reset();
    }
  }

  onDeleteComment(commentId:string, userId:string){
    this.store.dispatch(CommentActions.deleteComment({commentId: commentId, userId: userId}));
  }

}
