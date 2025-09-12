import { Routes } from '@angular/router';
import {PlaylistDetailComponent} from './pages/playlist-detail/playlist-detail.component';
import {AuthGuard} from './guards/auth.guard';


export const routes: Routes = [
  {
    path: 'home',
    loadComponent() {
      return import('../app/pages/home/home.component').then(
        (m) => m.HomeComponent,
      );
    }
  },
  {
    path: 'category',
    loadComponent() {
      return import('../app/pages/category/category.component').then(
        (m) => m.CategoryComponent,
      );
    }
  },
  {
    path: 'category-detail/:id',
    loadComponent() {
      return import('../app/pages/category-detail/category-detail.component').then(
        (m) => m.CategoryDetailComponent,
      );
    }
  },
  {
    path: 'upload',
    canActivate: [AuthGuard],
    loadComponent() {
      return import('../app/pages/upload/upload.component').then(
        (m) => m.UploadComponent,
      );
    }
  },
  {
    path: 'search',
    loadComponent() {
      return import('../app/pages/search/search.component').then(
        (m) => m.SearchComponent,
      );
    }
  },
  {
    path: 'playlist-detail',
    loadComponent() {
      return import('../app/pages/playlist-detail/playlist-detail.component').then(
        (m) => m.PlaylistDetailComponent,
      );
    }
  },

  {
    path: 'playlist-detail/:id',
    component: PlaylistDetailComponent
  },

  {
    path: 'song-detail/:id',
    loadComponent() {
      return import('../app/pages/song-detail/song-detail.component').then(
        (m) => m.SongDetailComponent,
      );
    }
  },
  // {
  //   path: 'profile',
  //   canActivate: [AuthGuard],
  //   loadComponent() {
  //     return import('../app/pages/profile/profile.component').then(
  //       (m) => m.ProfileComponent,
  //     );
  //   }
  // },
  {
    path: 'profile/:id',
    loadComponent() {
      return import('../app/pages/profile/profile.component').then(
        (m) => m.ProfileComponent,
      );
    }
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'home',
  },

];
