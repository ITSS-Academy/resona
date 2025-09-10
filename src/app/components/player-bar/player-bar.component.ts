import {Component, AfterViewInit, ViewChild, ElementRef, OnInit, OnDestroy} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {LyricComponent} from '../lyric/lyric.component';
import {MatDrawer, MatDrawerContainer} from '@angular/material/sidenav';
import {MatButton, MatIconButton} from '@angular/material/button';
import {QueueComponent} from '../queue/queue.component';
import {SmallAlbumComponent} from '../small-album/small-album.component';
import {Observable, Subscription} from 'rxjs';
import {TrackModel} from '../../models/track.model';
import {Store} from '@ngrx/store';
import {PlayState} from '../../ngrx/play/play.state';
import * as PlayActions from '../../ngrx/play/play.action';
import {AsyncPipe} from '@angular/common';
import {DurationPipe} from '../../shared/pipes/duration.pipe';
import {TrackState} from '../../ngrx/track/track.state';
import * as TrackActions from '../../ngrx/track/track.action';
import {Router} from '@angular/router';
import {CategoryModel} from '../../models/category.model';
import {CategoryState} from '../../ngrx/category/category.state';
import * as CategoryActions from '../../ngrx/category/category.action';
import {ImgConverterPipe} from '../../shared/pipes/img-converter.pipe';
import * as QueueActions from '../../ngrx/queue/queue.actions';
import {QueueState} from '../../ngrx/queue/queue.state';
import {AuthState} from '../../ngrx/auth/auth.state';
import {ProfileModel} from '../../models/profile.model';
import {QueueModel} from '../../models/queue.model';
import {getTrackById} from '../../ngrx/track/track.action';

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
    SmallAlbumComponent,
    AsyncPipe,
    DurationPipe,
    ImgConverterPipe,
  ],
  styleUrls: ['./player-bar.component.scss']
})
export class PlayerBarComponent implements OnInit, OnDestroy {

  @ViewChild('lyric') lyricDrawer!: MatDrawer;
  @ViewChild('queue') queueDrawer!: MatDrawer;
  @ViewChild('smallAlbum') smallAlbumDrawer!: MatDrawer;
  @ViewChild('audio', {static: true}) audio!: ElementRef<HTMLAudioElement>;

  currentTrack$!: Observable<TrackModel>;
  currentTrack!: TrackModel;
  isPlaying$!: Observable<boolean>;
  lyrics$!: Observable<string>;
  lyrics!: string;
  categoryDetail$!: Observable<CategoryModel>;
  categoryDetail!: CategoryModel;
  currentUser$!: Observable<ProfileModel>;
  currentUser!: ProfileModel;
  queueList$!: Observable<QueueModel[]>;
  queueList: QueueModel[] = [];

  isPlaying = true;
  duration = 0;
  currentTime = 0;
  lastTrack: TrackModel | null = null;
  filePath: string = '';
  subscriptions: Subscription[] = [];
  hasIncremented = false;
  repeatMode: 'none' | 'infinite' | 'once' = 'none';

  constructor(
    private router: Router,
    private store: Store<{
      play: PlayState,
      track: TrackState,
      category: CategoryState,
      queue: QueueState,
      auth: AuthState,
    }>
  ) {
    this.currentUser$ = this.store.select('auth', 'currentUser');
    this.queueList$ = this.store.select('queue', 'queueList');
  }

  ngOnInit() {
    const audio = this.audio.nativeElement;
    console.log('Audio element ready in OnInit:', audio);

    this.currentTrack$ = this.store.select(state => state.play.currentTrack);
    this.isPlaying$ = this.store.select(state => state.play.isPlaying);
    this.lyrics$ = this.store.select('track', 'lyrics');
    this.categoryDetail$ = this.store.select('category', 'category');

    // lắng nghe track thay đổi
    this.subscriptions.push(
      this.currentTrack$.subscribe(track => {
        console.log('Current track changed:', track);
        if (track) {
          this.lastTrack = track;
          this.currentTrack = track;
          this.filePath = this.buildStreamUrl(track);
          this.hasIncremented = false;
          this.store.dispatch(TrackActions.getLyricsByTrackId({id: track.id}))

          audio.src = this.filePath;
          audio.load();
          audio.play();
        }
      }),

      this.lyrics$.subscribe(lyrics => {
        this.lyrics = lyrics;
      }),

      this.categoryDetail$.subscribe(detail => {
        this.categoryDetail = detail;
      }),

      this.currentUser$.subscribe(currentUser => {
        if(currentUser) {
          this.currentUser = currentUser;
          this.store.dispatch(QueueActions.getQueueByUser({userId: this.currentUser.id}));
        }
      }),

      this.queueList$.subscribe(queueList => {
        this.queueList = queueList;
        console.log('Queue: ', this.queueList);
      }),

      // lắng nghe trạng thái play/pause
      this.isPlaying$.subscribe(isPlaying => {
        this.isPlaying = isPlaying;
        if (isPlaying) {
          audio.play();
        } else {
          audio.pause();
        }
      })
    );

    // cập nhật progress khi audio chạy
    audio.ontimeupdate = async () => {
      this.currentTime = audio.currentTime;
      this.duration = audio.duration || 0;
      if (this.currentTrack && !this.hasIncremented) {
        if (audio.currentTime >= 120) {
          this.store.dispatch(
            TrackActions.incrementTrackPlayCount({trackId: this.currentTrack.id})
          );
          await new Promise(resolve => setTimeout(resolve, 200));
          this.store.dispatch(TrackActions.getTrackById({id: this.currentTrack.id}));
          this.hasIncremented = true;
        }
      }

    };

    audio.addEventListener('ended', () => {
      if (this.repeatMode === 'once') {
        audio.currentTime = 0;
        audio.play();
        this.repeatMode = 'none'; // sau 1 lần thì quay lại none
      } else if (this.repeatMode === 'infinite') {
        audio.currentTime = 0;
        audio.play();
      } else {
        console.log('track ended') // nếu bạn có danh sách nhạc
      }
    });
  }

  onSeek(event: any) {
    const input = event.target as HTMLInputElement;
    const audio = this.audio.nativeElement;

    audio.currentTime = +input.value; // chỉ tua
    if (this.isPlaying) {
      audio.play(); // đảm bảo vẫn chạy tiếp
    }

    const percent = (+input.value / this.duration) * 100;
    input.style.setProperty('--progress', `${percent}%`);
  }


  buildStreamUrl(track: TrackModel) {
    return `https://cynhadjnrnyzycvxcpln.supabase.co/storage/v1/object/public/tracks/${track.filePath}`;
  }

  onTogglePlay() {
    if (!this.lastTrack) return;
    if (this.isPlaying) {
      this.store.dispatch(PlayActions.pause());
    } else {
      this.store.dispatch(PlayActions.play());
    }
  }

  onToggleRepeat() {
    if (this.repeatMode === 'none') {
      this.repeatMode = 'infinite';
    } else if (this.repeatMode === 'infinite') {
      this.repeatMode = 'once';
    } else {
      this.repeatMode = 'none';
    }
  }

  toggleLyric() {
    if(this.lyrics){
      if (this.queueDrawer.opened) {
        this.queueDrawer.close().then();
      }
      if (this.smallAlbumDrawer.opened) {
        this.smallAlbumDrawer.close().then();
      }
      this.lyricDrawer.toggle().then();
    }
  }

  toggleQueue() {
    if(this.queueList.length > 0){
      if (this.lyricDrawer.opened) {
        this.lyricDrawer.close().then();
      }
      if (this.smallAlbumDrawer.opened) {
        this.smallAlbumDrawer.close().then();
      }
      this.queueDrawer.toggle().then();
    }else{
      this.queueDrawer.close().then();
    }
  }

  toggleSmallAlbum() {
    if(this.currentTrack.id){
      if (this.lyricDrawer.opened) {
        this.lyricDrawer.close().then();
      }
      if (this.queueDrawer.opened) {
        this.queueDrawer.close().then();
      }
      this.smallAlbumDrawer.toggle().then();
    }
  }

  onTrackChanged(track: TrackModel) {
    this.currentTrack = track;
    this.hasIncremented = false; // reset lại để tính cho bài mới
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  navigateToSongDetail(id:string) {
    if(id){
      this.router.navigate([`/song-detail/${id}`]).then();
    }
  }
}
