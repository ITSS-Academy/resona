import {Component, Input, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Component({
  selector: 'app-lyric',
  imports: [],
  templateUrl: './lyric.component.html',
  styleUrl: './lyric.component.scss'
})
export class LyricComponent implements OnChanges {

  @Input() lyrics!: string;
  remakeLyric: SafeHtml = '';

  constructor(private sanitizer: DomSanitizer) {}

  ngOnChanges() {
    this.remakeLyric = this.sanitizer.bypassSecurityTrustHtml(
      this.lyrics?.replace(/\n/g, '<br>')
    );
  }
}
