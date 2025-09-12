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
import {getProfile} from './ngrx/auth/auth.actions';

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
  currentUser!: ProfileModel;
  uid: string = '';

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
        // const user: ProfileModel = {
        //   id: auth.uid,
        //   name: auth.name,
        //   email: auth.email,
        //   photoUrl: auth.photoURL,
        // };
        this.idToken = idToken;
        this.uid = auth.uid
        this.store.dispatch(AuthActions.storeAuth({
          idToken: idToken,
          currentUser: null as any
        }))
        this.store.dispatch(getProfile({
          id: this.uid
        }));

      } else {
        console.log('No user is signed in.');
      }
    });
    this.store.select(state => state.auth.isLoggedIn).subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.store.dispatch(getProfile({
          id: this.uid
        }));
      }
    })

    this.playlists$ = this.store.select('playlist', 'playlists');
    this.currentUser$ = this.store.select('auth', 'currentUser');

  }

  isCollapsed = false;

  menuItems = [
    {icon: 'home', title: 'Home', route: 'home'},
    {icon: 'category', title: 'Genres', route: 'category'},
    {icon: 'cloud_upload', title: 'Upload', route: 'upload'},
    {icon: 'account_circle', title: 'Profile', route: `profile`},
  ];

  ngOnInit() {
    this.setActiveLink();
    for (let item of this.menuItems) {
      if (item.route == this.activeLink) {
        console.log('Active link set to:', this.activeLink);
      }
    }

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
          console.log('Current user:======================', user);
          this.currentUser = user;
          this.store.dispatch(playlistActions.getPlaylists({userId: user.id}));
        }
      })
    );
  }

  onMenuClick(route: string) {
    console.log(route);
    if (route.includes('profile')   && this.currentUser && this.currentUser.id) {
      console.log('Current user:', this.currentUser);
      this.router.navigate([`/profile/${this.currentUser.id}`]).then();

    }
    else {
      this.router.navigate([route]);
    }
  }

  setActiveLink(): void {
    if (this.router.url.includes('/home')) {
      this.activeLink = this.menuItems[0].route;
    } else if (this.router.url.includes('/category')) {
      this.activeLink = this.menuItems[1].route;
    } else if (this.router.url.includes('/upload')) {
      this.activeLink = this.menuItems[2].route;
    } else if (
       this.router.url.includes(`/profile`)
    ) {
      this.activeLink = this.menuItems[3].route;
    } else {
      this.activeLink = '';
    }
  }

  navigateToPlaylistDetail(playlistId: string) {
    this.router.navigate(['/playlist-detail', playlistId]);
  }

  showCount = 4;
  expanded = false;

  togglePlaylists() {
    if (this.expanded) {
      // đang mở → thu lại
      this.showCount = 4;
      this.expanded = false;
    } else {
      // đang thu gọn → mở hết
      this.showCount = this.playlists.length;
      this.expanded = true;
    }
  }


  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
