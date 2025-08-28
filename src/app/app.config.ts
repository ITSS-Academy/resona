import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import {musicGenresReducer} from './ngrx/musicGenres/musicGenres.reducer';
import { provideEffects } from '@ngrx/effects';
import * as MusicGenresEffects from './ngrx/musicGenres/musicGenres.effects';
import {albumReducer} from './ngrx/album/album.reducer';
import {albumEffects} from './ngrx/album/album.effects';
import * as AlbumEffects from './ngrx/album/album.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore({
      musicGenres: musicGenresReducer,
      albums : albumReducer,
    }),
    provideEffects(
      MusicGenresEffects,
      AlbumEffects,
    ),
]
};
