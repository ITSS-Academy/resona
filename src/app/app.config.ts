import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideStore} from '@ngrx/store';
import {musicGenresReducer} from './ngrx/musicGenres/musicGenres.reducer';
import {provideEffects} from '@ngrx/effects';
import * as MusicGenresEffects from './ngrx/musicGenres/musicGenres.effects';
import {albumReducer} from './ngrx/album/album.reducer';
import * as AlbumEffects from './ngrx/album/album.effects';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import * as AuthEffects from './ngrx/auth/auth.effect';
import {getAuth, provideAuth} from '@angular/fire/auth';
import {authReducer} from './ngrx/auth/auth.reducer';
import {provideHttpClient} from '@angular/common/http';
import * as CategoryEffects from './ngrx/category/category.effect';
import {categoryReducer} from './ngrx/category/category.reducer';
import {playReducer} from './ngrx/play/play.reducer';
import {trackReducer} from './ngrx/track/track.reducer';
import * as TrackEffects from './ngrx/track/track.effect';
import {commentReducer} from './ngrx/comment/comment.reducer';
import * as CommentEffects from './ngrx/comment/comment.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideStore({
      auth: authReducer,
      category: categoryReducer,
      play: playReducer,
      track: trackReducer,
      musicGenres: musicGenresReducer,
      albums: albumReducer,
      comments: commentReducer,
    }),
    provideEffects(
      AuthEffects,
      CategoryEffects,
      TrackEffects,
      MusicGenresEffects,
      AlbumEffects,
      CommentEffects,
    ),
    provideFirebaseApp(() => initializeApp({
      projectId: "resona-77317",
      appId: "1:936453969969:web:ad2b8d5251ac37a5b25d10",
      storageBucket: "resona-77317.firebasestorage.app",
      apiKey: "AIzaSyA4o2HCZUfRuU1QioBP67askYYSActohPI",
      authDomain: "resona-77317.firebaseapp.com",
      messagingSenderId: "936453969969"
    })), provideAuth(() => getAuth()),
  ]
};
