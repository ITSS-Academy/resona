import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AlbumModel} from '../../models/album.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-album-card',
  imports: [],
  templateUrl: './album-card.component.html',
  styleUrl: './album-card.component.scss'
})
export class AlbumCardComponent implements OnInit , OnDestroy {
  @Input() album!: AlbumModel;

  constructor(
    private router: Router,
  ) {
  }

  ngOnInit() {}

  ngOnDestroy() {}

  navigateToSongDetail(id: string) {
    this.router.navigate(['/song-detail', id]).then(() => {
      window.location.reload();
    });
  }
}
