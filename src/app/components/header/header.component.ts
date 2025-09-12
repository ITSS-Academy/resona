import {Component, EventEmitter, inject, OnDestroy, OnInit, Output} from '@angular/core';
import {MaterialModule} from '../../shared/modules/material.module';
import {Router} from '@angular/router';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {LoginDialogComponent} from '../login-dialog/login-dialog.component';
import {CreatePlaylistDialogComponent} from '../create-playlist-dialog/create-playlist-dialog.component';
import {debounceTime, distinctUntilChanged, Observable, Subscription} from 'rxjs';
import {ProfileModel} from '../../models/profile.model';
import {Store} from '@ngrx/store';
import {AuthState} from '../../ngrx/auth/auth.state';
import {AsyncPipe} from '@angular/common';
import {logout} from '../../ngrx/auth/auth.actions';
import {SearchState} from '../../ngrx/search/search.state';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import * as SearchActions from '../../ngrx/search/search.actions';

@Component({
  selector: 'app-header',
  imports: [MaterialModule, AsyncPipe, ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() toggleSidebar = new EventEmitter<void>();

  searchText: string = '';
  searchControl = new FormControl('');
  profile$!: Observable<ProfileModel>;
  profile!: ProfileModel;
  isLogging$!: Observable<boolean>;
  isLogging = false;
  isGettingProfile$!: Observable<boolean>;
  subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private store: Store<{
      auth: AuthState,
      search: SearchState
    }>
  ) {
    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((query) => {
        if (query) {
          this.store.dispatch(SearchActions.searchCategories({query}));
          this.store.dispatch(SearchActions.searchTracks({query}));
          this.store.dispatch(SearchActions.searchPlaylists({query}));
          this.store.dispatch(SearchActions.searchProfiles({query}));
        }
      });
  }

  ngOnInit() {
    this.profile$ = this.store.select('auth', 'currentUser');
    this.isLogging$ = this.store.select('auth', 'isLogging');
    this.isGettingProfile$ = this.store.select('auth', 'isGettingProfile');

    this.subscriptions.push(
      this.profile$.subscribe(profile => {
        if (profile.id) {
          this.profile = profile;
          console.log('Current user:', profile);
        }
      }),
      this.isLogging$.subscribe(isLogging => {
        this.isLogging = isLogging;
      })
    )
  }

  onToggleSidebar() {
    this.toggleSidebar.emit();
  }

  navigateToSearch() {
    if (this.searchText.trim()) {
      this.router.navigate(['/search'], {queryParams: {q: this.searchText}});
    } else {
      this.router.navigate(['/search']);
    }
  }

  navigateToProfile(id: string) {
    this.router.navigate([`/profile/${id}`]).then();
    window.location.reload();
  }

  logout() {
    this.store.dispatch(logout());
  }

  openLoginDialog() {
    this.dialog.open(LoginDialogComponent, {
      width: '700px',
      panelClass: 'custom-dialog-container'
    })
  }

  openCreateDialog() {
    this.dialog.open(CreatePlaylistDialogComponent, {
      width: '700px',
      panelClass: 'custom-dialog-container'
    });
  }

  onImgError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = 'assets/images/default-avatar.png';
  }


  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
