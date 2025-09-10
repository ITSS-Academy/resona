import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {AuthState} from '../../ngrx/auth/auth.state';
import {Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import {ProfileModel} from '../../models/profile.model';

@Component({
  selector: 'app-delete-comment-dialog',
  imports: [
    MatDialogClose,
    MatButton,
    MatDialogActions,
    MatDialogTitle,
    MatDialogContent
  ],
  templateUrl: './delete-comment-dialog.component.html',
  styleUrl: './delete-comment-dialog.component.scss'
})
export class DeleteCommentDialogComponent implements OnInit , OnDestroy {

  @Input() commentId!: string;
  currentUser$!: Observable<ProfileModel>;
  currentUser!: ProfileModel;
  subscriptions: Subscription[] = [];

  constructor(
    private store:Store<{
      auth:AuthState,
    }>
  ) {
  }

  ngOnInit() {
    this.currentUser$ = this.store.select ('auth', 'currentUser');
    this.subscriptions.push(
      this.currentUser$.subscribe((profile) => {
        this.currentUser = profile;
      }),
    )

  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

}
