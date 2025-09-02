import {Component} from '@angular/core';
import {MatTab, MatTabGroup, MatTabsModule} from '@angular/material/tabs';
import {
  MatList,
  MatListItem,
  MatListOption,
  MatSelectionList
} from '@angular/material/list';
import {MatButton} from '@angular/material/button';
import {TrackService} from '../../services/track/track.service';
import {TrackModel} from '../../models/track.model';
import {Observable} from 'rxjs';
import {DurationPipe} from '../../shared/pipes/duration.pipe';
import {PlayState} from '../../ngrx/play/play.state';
import {Store} from '@ngrx/store';
import * as PlayActions from '../../ngrx/play/play.action';
import {MusicTabComponent} from '../../components/music-tab/music-tab.component';
import {TrackState} from '../../ngrx/track/track.state';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  imports: [
    MatTabGroup,
    MatTab,
    MatTabsModule,
    MatList,
    MatListItem,
    MatButton,
    MatListOption,
    MatSelectionList,
    DurationPipe,
    MusicTabComponent
  ],
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  typesOfShoes: string[] = [
    'song',
  ];
  firstList = [
    {name: 'Item 1'},
    {name: 'Item 2'}
  ];
  secondList = [
    {title: 'Title A'},
    {title: 'Title B'}
  ];

  uploadedTracks$!: Observable<TrackModel[]>;
  uploadedTracks: TrackModel[] = [];

  constructor(
    private trackService: TrackService,
    private store: Store<{
      track: TrackState,
    }>
  ) {
    this.uploadedTracks$ = this.trackService.getTracksByOwnerId('0kDK3BVwetazu7zd5nsIi9oETbw2')

    this.uploadedTracks$.subscribe((tracks: TrackModel[]) => {
      this.uploadedTracks = tracks;
      console.log('Uploaded tracks:', tracks);
    })
  }


}


