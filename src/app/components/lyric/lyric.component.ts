import {Component, Input, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {Observable, Subscription} from 'rxjs';
import {TrackState} from '../../ngrx/track/track.state';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-lyric',
  imports: [],
  templateUrl: './lyric.component.html',
  styleUrl: './lyric.component.scss'
})
export class LyricComponent implements OnInit, OnDestroy {
  lyrics$!: Observable<string>
  lyrics: string = '';
  subscription: Subscription[]=[];
  remakeLyric: SafeHtml = '';

  constructor(
    private sanitizer: DomSanitizer,
    private store:Store<{
      track: TrackState,
    }>
  ) {
    this.lyrics$ = this.store.select('track','lyrics');
  }

  ngOnDestroy(): void {
    this.subscription.forEach(s => s.unsubscribe());
    }

  ngOnInit(): void {
    this.subscription.push(
      this.lyrics$.subscribe(lyric=>{
        if (lyric) {
          this.lyrics = lyric;
          this.remakeLyric = this.sanitizer.bypassSecurityTrustHtml(
            this.lyrics?.replace(/\n/g, '<br>')
          );
        }
      }),
    )
  }
}
