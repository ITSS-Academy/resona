import {Component, OnDestroy, OnInit} from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import {MaterialModule} from './shared/modules/material.module';
import {HeaderComponent} from './components/header/header.component';
import {PlayerBarComponent} from './components/player-bar/player-bar.component';
import {NgStyle} from '@angular/common';
import {Auth} from '@angular/fire/auth';
import {Store} from '@ngrx/store';
import {AuthState} from './ngrx/auth/auth.state';
import * as AuthActions from './ngrx/auth/auth.actions';
import {Observable, Subscription} from 'rxjs';
import {PlaylistModel} from './models/playlist.model';
import {PlaylistState} from './ngrx/playlist/playlist.state';
import {PlaylistImgConverterPipe} from './shared/pipes/playlist-img-converter.pipe';
import {ProfileModel} from './models/profile.model';
import * as playlistActions from './ngrx/playlist/playlist.action';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MaterialModule,
    HeaderComponent,
    PlayerBarComponent,
    RouterLink,
    RouterLinkActive,
    NgStyle,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'resona';
  activeLink = '';

  subscriptions: Subscription[] = [];
  idToken$!: Observable<string>;
  idToken: string = '';
  playlists$!: Observable<PlaylistModel[]>;
  playlists: PlaylistModel[] = [];
  currentUser$!: Observable<ProfileModel>;

  constructor(
    private router: Router,
    private auth: Auth,
    private store: Store<{
      auth: AuthState;
      playlist: PlaylistState;
    }>
  ) {
    this.idToken$ = this.store.select('auth', 'idToken');

    this.auth.onAuthStateChanged(async (auth: any) => {
      if (auth) {
        let idToken = await auth.getIdToken();
        const user: ProfileModel = {
          id: auth.uid,
          name: auth.name,
          email: auth.email,
          photoUrl: auth.photoURL,
        };
        this.store.dispatch(
          AuthActions.storeAuth({currentUser: user, idToken: idToken})
        );
      } else {
        console.log('No user is signed in.');
      }
    });
  }

  isCollapsed = false;

  menuItems = [
    {icon: 'home', title: 'Home', route: 'home'},
    {icon: 'category', title: 'Genres', route: 'category'},
    {icon: 'cloud_upload', title: 'Upload', route: 'upload'},
    {icon: 'account_circle', title: 'Profile', route: 'profile'},
  ];

  ngOnInit() {
    this.setActiveLink();
    for (let item of this.menuItems) {
      if (item.route == this.activeLink) {
        console.log('Active link set to:', this.activeLink);
      }
    }

    this.playlists$ = this.store.select('playlist', 'playlists');
    this.currentUser$ = this.store.select('auth', 'currentUser');

    this.subscriptions.push(
      this.idToken$.subscribe((idToken: string) => {
        if (idToken) {
          console.log('ID Token:', idToken);
          this.idToken = idToken;
        }
      }),
      this.playlists$.subscribe((playlists) => {
        this.playlists = playlists;
        console.log(this.playlists);
      }),
      this.currentUser$.subscribe((user: ProfileModel) => {
        if (user && user.id) {
          this.store.dispatch(playlistActions.getPlaylists({userId: user.id}));
        }
      })
    );
  }

  onMenuClick(route: string) {
    this.router.navigate([route]);
  }

  setActiveLink(): void {
    if (this.router.url.includes('/home')) {
      this.activeLink = this.menuItems[0].route;
    } else if (this.router.url.includes('/category')) {
      this.activeLink = this.menuItems[1].route;
    } else if (this.router.url.includes('/upload')) {
      this.activeLink = this.menuItems[2].route;
    } else if (this.router.url.includes('/profile')) {
      this.activeLink = this.menuItems[3].route;
    } else {
      this.activeLink = '';
    }
  }

  navigateToPlaylistDetail(playlistId: string) {
    this.router.navigate(['/playlist-detail', playlistId]);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
