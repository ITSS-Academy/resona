  import {Component, OnDestroy, OnInit} from '@angular/core';
  import {Observable, Subscription} from 'rxjs';
  import {MaterialModule} from '../../shared/modules/material.module';
  import {ProfileModel} from '../../models/profile.model';
  import {Store} from '@ngrx/store';
  import {MatDialog, MatDialogRef} from '@angular/material/dialog';
  import {AuthState} from '../../ngrx/auth/auth.state';
  import {LoginDialogComponent} from '../login-dialog/login-dialog.component';
  import {AsyncPipe} from '@angular/common';

  @Component({
    selector: 'app-login-required-dialog',
    imports: [MaterialModule, AsyncPipe],
    templateUrl: './login-required-dialog.component.html',
    styleUrl: './login-required-dialog.component.scss'
  })
  export class LoginRequiredDialogComponent{
    constructor(
      private dialog: MatDialog,
      private dialogRef: MatDialogRef<LoginRequiredDialogComponent>
    ) {}

    openLoginDialog() {
      this.dialog.open(LoginDialogComponent, {
        width: '700px',
        panelClass: 'custom-dialog-container'
      });
      this.dialogRef.close();
    }
    closeDialog() {
      this.dialogRef.close();
    }
  }
