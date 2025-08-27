import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import {musicGenresReducer} from './ngrx/musicGenres/musicGenres.reducer';
import { provideEffects } from '@ngrx/effects';
import * as MusicGenresEffects from './ngrx/musicGenres/musicGenres.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore({
        musicGenres: musicGenresReducer
    }),
    provideEffects(
      MusicGenresEffects,
    ),
]
};
