import { Component } from '@angular/core';
import {FullAlbumDetailComponent} from '../../components/full-album-detail/full-album-detail.component';
import {SongDetailButtonComponent} from '../../components/song-detail-button/song-detail-button.component';
import {ThreeOptionsButtonComponent} from '../../components/three-options-button/three-options-button.component';
import {ActivatedRoute} from '@angular/router';

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
export class SongDetailComponent {

  constructor(
    private activatedRoute: ActivatedRoute,
  ) {
    let {id} = this.activatedRoute.snapshot.params;
    console.log(id);
  }

}
