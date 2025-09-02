import {Actions, createEffect, ofType} from '@ngrx/effects';
import {AlbumService} from '../../services/album/album.service';
import {inject} from '@angular/core';
import * as AlbumActions from '../album/album.actions';
import {catchError, map, of, switchMap} from 'rxjs';
import {AlbumModel} from '../../models/album.model';

export const albumEffects = createEffect(
  (action$ = inject(Actions), albumService = inject (AlbumService))=>{
    return action$.pipe(
      ofType(AlbumActions.getAllAlbums),
      switchMap(()=>
        of(albumService.getAllAlbums()).pipe(
          map((albumList:AlbumModel[])=>
            AlbumActions.getAllAlbumsSuccess({albumList: albumList})
          ),
          catchError((error:any) =>
            of(AlbumActions.getAllAlbumsFailure({error}))
          )
        )
      )
    );
  },
  {functional: true}
);

export const albumByIdEffects = createEffect(
  (action$ = inject(Actions), albumService = inject (AlbumService))=>{
    return action$.pipe(
      ofType(AlbumActions.getAlbumById),
      switchMap((action)=>
        of(albumService.getAlbumById(action.id)).pipe(
          map((albumDetail:AlbumModel)=>
            AlbumActions.getAlbumByIdSuccess({albumDetail: albumDetail})
          ),
          catchError((error:any) =>
            of(AlbumActions.getAlbumByIdFailure({error}))
          )
        )
      )
    );
  },
  {functional: true}
);

export const albumsByArtistEffects = createEffect(
  (action$ = inject(Actions), albumService = inject (AlbumService))=>{
    return action$.pipe(
      ofType(AlbumActions.getAlbumsByArtist),
      switchMap((action)=>
        of(albumService.getAlbumsByArtist(action.artist)).pipe(
          map((albumList:AlbumModel[])=>
            AlbumActions.getAlbumsByArtistSuccess({albumList: albumList})
          ),
          catchError((error:any) =>
            of(AlbumActions.getAlbumsByArtistFailure({error}))
          )
        )
      )
    );
  },
  {functional: true}
)
