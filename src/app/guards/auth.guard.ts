// src/app/guards/auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthState } from '../ngrx/auth/auth.state';
import { map, take } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { LoginRequiredDialogComponent } from '../components/login-required-dialog/login-required-dialog.component';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private store: Store<{ auth: AuthState }>,
    private router: Router,
    private dialog: MatDialog
  ) {}

  canActivate() {
    return this.store.select('auth', 'currentUser').pipe(
      take(1),
      map(user => {
        if (user && user.uid) {
          // ✅ Đã login → cho vào route
          return true;
        } else {
          // ❌ Chưa login → về home + bật dialog
          this.router.navigate(['/home']);
          this.dialog.open(LoginRequiredDialogComponent, {
            width: '400px',
            height: '180px',
            disableClose: true,
          });
          return false;
        }
      })
    );
  }
}
