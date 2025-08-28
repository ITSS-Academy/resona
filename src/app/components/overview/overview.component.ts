import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AlbumCardComponent} from '../album-card/album-card.component';
import {MatIconModule} from '@angular/material/icon';
import {AlbumModel} from '../../models/album.model';

@Component({
  selector: 'app-overview',
  imports: [
    AlbumCardComponent,
    MatIconModule,
  ],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent implements OnInit , OnDestroy {
  @Input() albums!: AlbumModel[];

  constructor(
  ) {}

  ngOnInit() {}

  ngOnDestroy() {}

}

