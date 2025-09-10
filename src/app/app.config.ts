import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideStore} from '@ngrx/store';
import {provideEffects} from '@ngrx/effects';
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
import * as PlaylistEffects from './ngrx/playlist/playlist.effect';
import {playlistReducer} from './ngrx/playlist/playlist.reducer';
import {searchReducer} from './ngrx/search/search.reducer';
import * as SearchEffects from './ngrx/search/search.effect';
import {queueReducer} from './ngrx/queue/queue.reducer';
import * as QueueEffects from './ngrx/queue/queue.effects'
import {historyReducer} from './ngrx/history/history.reducer';
import * as HistoryEffects from './ngrx/history/history.effect';
import {profileReducer} from './ngrx/profile/profile.reducer';
import * as ProfileEffects from './ngrx/profile/profile.effects';

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
      comments: commentReducer,
      playlist: playlistReducer,
      search: searchReducer,
      queue: queueReducer,
      history: historyReducer,
      profile: profileReducer,
    }),
    provideEffects(
      AuthEffects,
      CategoryEffects,
      TrackEffects,
      CommentEffects,
      PlaylistEffects,
      SearchEffects,
      QueueEffects,
      HistoryEffects,
      ProfileEffects,
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
