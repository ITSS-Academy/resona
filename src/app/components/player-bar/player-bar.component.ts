import {Component, AfterViewInit, ViewChild} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {LyricComponent} from '../lyric/lyric.component';
import {MatDrawer, MatDrawerContainer} from '@angular/material/sidenav';
import {MatIconButton} from '@angular/material/button';
import {QueueComponent} from '../queue/queue.component';
import {AlbumCardComponent} from '../album-card/album-card.component';
import {QueueSongDetailComponent} from '../queue-song-detail/queue-song-detail.component';

@Component({
  selector: 'app-player-bar',
  templateUrl: './player-bar.component.html',
  imports: [
    MatIconModule,
    LyricComponent,
    MatDrawerContainer,
    MatIconButton,
    MatDrawer,
    QueueComponent,
  ],
  styleUrls: ['./player-bar.component.scss']
})
export class PlayerBarComponent implements AfterViewInit {

  @ViewChild('lyric') lyricDrawer!: MatDrawer;
  @ViewChild('queue') queueDrawer!: MatDrawer;

  toggleLyric() {
    if (this.queueDrawer.opened) {
      this.queueDrawer.close().then();
    }
    this.lyricDrawer.toggle().then();
  }

  toggleQueue() {
    if (this.lyricDrawer.opened) {
      this.lyricDrawer.close().then();
    }
    this.queueDrawer.toggle().then();
  }

  ngAfterViewInit() {
    // Play progress
    const playRange = document.querySelector('.player-progress input[type="range"]') as HTMLInputElement;
    if (playRange) {
      this.updateGradient(playRange);
      playRange.addEventListener('input', () => this.updateGradient(playRange));
    }
    // Volume
    const volumeRange = document.querySelector('.player-right input[type="range"]') as HTMLInputElement;
    if (volumeRange) {
      this.updateGradient(volumeRange);
      volumeRange.addEventListener('input', () => this.updateGradient(volumeRange));
    }
  }

  updateGradient(range: HTMLInputElement) {
    const percent = ((+range.value - +range.min) / (+range.max - +range.min)) * 100;
    range.style.backgroundSize = `${percent}% 100%`;
  }
  // ngAfterViewInit() {
  //   const sliders = document.querySelectorAll<HTMLInputElement>(
  //     '.player-progress input[type="range"], .player-right input[type="range"]'
  //   );
  //   sliders.forEach((slider) => {
  //     this.updateSliderBackground(slider);
  //     slider.addEventListener('input', () => this.updateSliderBackground(slider));
  //   });
  // }
  //
  // private updateSliderBackground(slider: HTMLInputElement) {
  //   const value =
  //     ((+slider.value - +slider.min) / (+slider.max - +slider.min)) * 100;
  //   slider.style.backgroundSize = `${value}% 100%`;
  // }
}
