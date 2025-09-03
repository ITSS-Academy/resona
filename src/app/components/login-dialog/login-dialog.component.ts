import {Component, inject} from '@angular/core';
import {MaterialModule} from '../../shared/modules/material.module';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';
import {Store} from '@ngrx/store';
import {AuthState} from '../../ngrx/auth/auth.state';
import * as AuthActions from '../../ngrx/auth/auth.actions';
import {MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-login-dialog',
  imports: [MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login-dialog.component.html',
  styleUrl: './login-dialog.component.scss'
})
export class LoginDialogComponent {

  constructor(
    private store: Store<{ auth: AuthState }>,
    public dialogRef: MatDialogRef<LoginDialogComponent>,
  ) {
  }

  login() {
    this.store.dispatch(AuthActions.login())
    this.dialogRef.close();
  }
}
