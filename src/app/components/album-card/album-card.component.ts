import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TrackModel} from '../../models/track.model';
import {ImgConverterPipe} from '../../shared/pipes/img-converter.pipe';

@Component({
  selector: 'app-album-card',
  imports: [
    ImgConverterPipe
  ],
  templateUrl: './album-card.component.html',
  styleUrl: './album-card.component.scss'
})
export class AlbumCardComponent implements OnInit , OnDestroy {

  @Input() track!: TrackModel;

  constructor(
    private router: Router,
  ) {
  }

  ngOnInit() {}

  ngOnDestroy() {}

  navigateToSongDetail() {
    this.router.navigate([`/song-detail/${this.track.id}`]).then(() => {
      window.location.reload();
    });
  }
}
