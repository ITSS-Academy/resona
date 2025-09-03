import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FullAlbumDetailComponent} from '../../components/full-album-detail/full-album-detail.component';
import {SongDetailButtonComponent} from '../../components/song-detail-button/song-detail-button.component';
import {ThreeOptionsButtonComponent} from '../../components/three-options-button/three-options-button.component';
import {ActivatedRoute} from '@angular/router';
import * as AlbumActions from '../../ngrx/album/album.actions';
import {Store} from '@ngrx/store';
import {AlbumState} from '../../ngrx/album/album.state';
import {Observable, Subscription} from 'rxjs';
import {AlbumModel} from '../../models/album.model';
import {CommentModel} from '../../models/comment.model';
import {CommentState} from '../../ngrx/comment/comment.state';
import * as CommentActions from '../../ngrx/comment/comment.actions';

@Component({
  selector: 'app-song-detail',
  imports: [
    FullAlbumDetailComponent,
    SongDetailButtonComponent,
    ThreeOptionsButtonComponent,
  ],
  templateUrl: './song-detail.component.html',
  styleUrl: './song-detail.component.scss'
})
export class SongDetailComponent implements OnInit , OnDestroy{

  albumDetail$!: Observable<AlbumModel>;
  subscription: Subscription[]=[];
  albumDetail!: AlbumModel;
  albumRelatedToArtist$!: Observable<AlbumModel[]>;
  albumRelatedToArtist: AlbumModel[] = [];
  comment$!: Observable<CommentModel[]>;
  comment: CommentModel[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<{
      albums: AlbumState,
      comments: CommentState,
    }>
  ) {
    let {id} = this.activatedRoute.snapshot.params;
    console.log(id);
    this.albumDetail$ = this.store.select ('albums', 'albumDetail');
    this.albumRelatedToArtist$ = this.store.select('albums', 'albumList');
    this.comment$ = this.store.select('comments', 'commentList');
    this.store.dispatch(AlbumActions.getAlbumById({id: id}));
    this.store.dispatch(CommentActions.getComments({id: '46c5f304-91b3-4d74-ae28-a022cbe89e46'}));
  }

  ngOnInit(): void {
    this.subscription.push(
      this.albumDetail$.subscribe(album=>{
        this.albumDetail = album;
        if (album && album.artist) {
          // Dispatch action to get albums by the same artist
          this.store.dispatch(AlbumActions.getAlbumsByArtist({ artist: album.artist }));
          console.log(album.artist);
        }
      }),
      this.albumRelatedToArtist$.subscribe(albumList=>{
        this.albumRelatedToArtist = albumList;
        console.log(this.albumRelatedToArtist);
      }),
      this.comment$.subscribe(comments=>{
        this.comment = comments;
        console.log(this.comment);
      }),
    )
  }

  ngOnDestroy() {
    this.subscription.forEach(subscription => subscription.unsubscribe());
  }

}
