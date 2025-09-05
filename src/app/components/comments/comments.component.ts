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
import {MatIconButton} from '@angular/material/button';

@Component({
  selector: 'app-comments',
  imports: [
    MatFormField,
    MatInput,
    MatFormField,
    MatIconModule,
    ReactiveFormsModule,
    MatIconButton,
  ],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss'
})
export class CommentsComponent implements OnInit , OnDestroy{

  profile$!: Observable<ProfileModel>;
  profile!: ProfileModel;
  subscriptions: Subscription[] = [];
  comments$!: Observable<CommentModel>;
  comments!: CommentModel;

  @Input() commentList!: CommentModel[];
  @Input() trackDetail!: TrackModel;
  @Input() totalComment!: number;

  constructor(
    private store:Store<{
      comment: CommentState,
      auth: AuthState,
    }>
  ) {
    this.comments$ = this.store.select('comment', 'comment');
    this.profile$ = this.store.select('auth', 'currentUser');
  }

  ngOnInit() {
    this.subscriptions.push(
      this.profile$.subscribe(profile => {
        this.profile = profile;
        console.log(this.profile);
      }),
      this.comments$.subscribe(comments => {
      }),
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  commentForm = new FormGroup({
    content: new FormControl(''),
  });

  createComment(){
    if(this.commentForm.valid){
      const newComment = {
        // trackId: id,
        trackId: this.trackDetail.id,
        userId: this.profile.uid,
        content: this.commentForm.value.content || '',
      }
      this.store.dispatch(CommentActions.createComment(newComment));
      this.commentForm.reset();
    }
  }

}
