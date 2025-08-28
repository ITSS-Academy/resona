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


  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<{
      albums: AlbumState,
    }>
  ) {
    let {id} = this.activatedRoute.snapshot.params;
    console.log(id);
    this.albumDetail$ = this.store.select ('albums', 'albumDetail');
    this.store.dispatch(AlbumActions.getAlbumById({id: id}));
  }

  ngOnInit(): void {
    this.subscription.push(
      this.albumDetail$.subscribe(album=>{
        this.albumDetail = album;
        console.log(album);
      })
    )
  }

  ngOnDestroy() {
    this.subscription.forEach(subscription => subscription.unsubscribe());
  }

}
