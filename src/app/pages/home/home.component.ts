import {Component, ViewChild, ElementRef, AfterViewInit, Renderer2, OnDestroy, OnInit} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MusicGenresModel } from '../../models/musicGenres.model';
import {MoodPlaylistModel} from '../../models/moodPlaylist.model';
import {NewReleaseSongModel} from '../../models/newReleaseSong.model';
import {PopularArtistModel} from '../../models/popularArtist.model';
import {MusicGenresService} from '../../service/music-genres/music-genres.service';
import {MoodPlaylistService} from '../../service/mood-playlist/mood-playlist.service';
import {NewReleaseSongsService} from '../../service/new-release-songs/new-release-songs.service';
import {PopularArtistService} from '../../service/popular-artist/popular-artist.service';


// import {Router} from '@angular/router';
// import {MusicGenresState} from '../../ngrx/musicGenres/musicGenres.state';
// import {Store} from '@ngrx/store';
// import {Observable, Subscription} from 'rxjs';
// import * as MusicGenresActions from '../../ngrx/musicGenres/musicGenres.actions';
// import {AlbumModel} from '../../models/album.model';
// import {AlbumState} from '../../ngrx/album/album.state';
// import * as AlbumActions from '../../ngrx/album/album.actions';
// import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [
    MatIconModule,
    MatIconButton
    // AsyncPipe
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit, OnInit , OnDestroy {
  @ViewChild('genresScroll') genresScroll!: ElementRef;
  @ViewChild('moodScroll') moodScroll!: ElementRef;
  @ViewChild('artistScroll') artistScroll!: ElementRef;

  isGenresScrollable = false;
  showGenresLeftBtn = false;
  showGenresRightBtn = false;

  isMoodScrollable = false;
  showMoodLeftBtn = false;
  showMoodRightBtn = false;

  isArtistScrollable = false;
  showArtistLeftBtn = false;
  showArtistRightBtn = false;

  musicGenres: MusicGenresModel[] = [];
  moodPlaylists: MoodPlaylistModel[] = [];
  newReleases: NewReleaseSongModel[] = [];
  popularArtists: PopularArtistModel[] = [];

  constructor(
    private musicGenresService: MusicGenresService,
    private moodPlaylistService: MoodPlaylistService,
    private newReleasesService: NewReleaseSongsService,
    private popularArtistService: PopularArtistService,
    private renderer: Renderer2
  ) {
    this.musicGenres = this.musicGenresService.categories;
    this.moodPlaylists = this.moodPlaylistService.playlists;
    this.newReleases = this.newReleasesService.songs;
    this.popularArtists = this.popularArtistService.artists;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      // Music Genres
      this.isGenresScrollable = this.checkScrollable(this.genresScroll);
      this.updateGenresScrollBtns();
      this.genresScroll.nativeElement.addEventListener('scroll', () => {
        this.updateGenresScrollBtns();
      });

      // Ensure only full cards are visible
      this.adjustGenresScrollWidth();
      window.addEventListener('resize', () => this.adjustGenresScrollWidth());

      // Mood Playlist
      this.isMoodScrollable = this.checkScrollable(this.moodScroll);
      this.updateMoodScrollBtns();
      this.moodScroll.nativeElement.addEventListener('scroll', () => {
        this.updateMoodScrollBtns();
      });

      // Popular Artists
      this.isArtistScrollable = this.checkScrollable(this.artistScroll);
      this.updateArtistScrollBtns();
      this.artistScroll.nativeElement.addEventListener('scroll', () => {
        this.updateArtistScrollBtns();
      });
    });
  }

  checkScrollable(ref: ElementRef): boolean {
    const el = ref.nativeElement;
    return el.scrollWidth > el.clientWidth;
  }

  // private scrollByCards(direction: 'left' | 'right', numCards: number = 3) {
  //   const el = this.genresScroll.nativeElement;
  //   const card = el.querySelector('.card') as HTMLElement;
  //   if (!card) return;
  //   const style = window.getComputedStyle(card);
  //   const cardWidth = card.offsetWidth;
  //   const gap = parseInt(style.marginRight) || 16;
  //   const scrollAmount = (cardWidth + gap) * numCards;
  //   el.scrollBy({ left: direction === 'right' ? scrollAmount : -scrollAmount, behavior: 'smooth' });
  //   setTimeout(() => this.updateGenresScrollBtns(), 300);
  // }

  scrollRight() {
    this.scrollByCards('right', 3);
  }

  scrollLeft() {
    this.scrollByCards('left', 3);
  }

  updateGenresScrollBtns() {
    const el = this.genresScroll.nativeElement;
    this.showGenresLeftBtn = el.scrollLeft > 0;
    // Allow a small threshold for floating point errors
    this.showGenresRightBtn = el.scrollLeft + el.clientWidth < el.scrollWidth - 2;
  }

  adjustGenresScrollWidth() {
    const el = this.genresScroll.nativeElement;
    const cards = el.querySelectorAll('.card');
    if (!cards.length) return;
    const style = window.getComputedStyle(cards[0]);
    const cardWidth = cards[0].offsetWidth;
    const gap = parseInt(style.marginRight) || 16;
    const parentWidth = el.parentElement.offsetWidth;

    // Get left padding from .horizontal-scroll
    const scrollStyle = window.getComputedStyle(el);
    const leftPadding = parseInt(scrollStyle.paddingLeft) || 0;

    const totalCards = cards.length;
    // Subtract left padding from parent width
    const availableWidth = parentWidth - leftPadding;
    const maxCardsFit = Math.floor((availableWidth + gap) / (cardWidth + gap));
    const numCards = Math.min(maxCardsFit, totalCards);
    const visibleWidth = numCards * cardWidth + (numCards - 1) * gap;

    this.renderer.setStyle(el, 'max-width', `${visibleWidth}px`);

    if (totalCards <= maxCardsFit) {
      this.renderer.addClass(el, 'centered');
    } else {
      this.renderer.removeClass(el, 'centered');
    }
  }

  // // Add this method to HomeComponent
  // private snapScrollToCard() {
  //   const el = this.genresScroll.nativeElement;
  //   const card = el.querySelector('.card') as HTMLElement;
  //   if (!card) return;
  //   const style = window.getComputedStyle(card);
  //   const cardWidth = card.offsetWidth;
  //   const gap = parseInt(style.marginRight) || 16;
  //   const totalCardWidth = cardWidth + gap;
  //   // Snap to nearest card boundary
  //   const snapped = Math.round(el.scrollLeft / totalCardWidth) * totalCardWidth;
  //   el.scrollLeft = snapped;
  // }

  // Update scrollByCards to snap after scroll
  private scrollByCards(direction: 'left' | 'right', numCards: number = 3) {
    const el = this.genresScroll.nativeElement;
    const card = el.querySelector('.card') as HTMLElement;
    if (!card) return;
    const style = window.getComputedStyle(card);
    const cardWidth = card.offsetWidth;
    const gap = parseInt(style.marginRight) || 16;
    const scrollAmount = (cardWidth + gap) * numCards;
    el.scrollBy({ left: direction === 'right' ? scrollAmount : -scrollAmount, behavior: 'smooth' });
    setTimeout(() => {
      // this.snapScrollToCard();
      this.updateGenresScrollBtns();
    }, 350);
  }
  // ----------------------------------------------------------------------------------------------------------------------
  scrollMoodRight() { this.scrollByCardsGeneric(this.moodScroll, 'right', 3, 'card'); }
  scrollMoodLeft() { this.scrollByCardsGeneric(this.moodScroll, 'left', 3, 'card'); }
  updateMoodScrollBtns() {
    const el = this.moodScroll.nativeElement;
    this.showMoodLeftBtn = el.scrollLeft > 0;
    this.showMoodRightBtn = el.scrollLeft + el.clientWidth < el.scrollWidth - 2;
  }

  scrollArtistRight() { this.scrollByCardsGeneric(this.artistScroll, 'right', 3, 'artist'); }
  scrollArtistLeft() { this.scrollByCardsGeneric(this.artistScroll, 'left', 3, 'artist'); }
  updateArtistScrollBtns() {
    const el = this.artistScroll.nativeElement;
    this.showArtistLeftBtn = el.scrollLeft > 0;
    this.showArtistRightBtn = el.scrollLeft + el.clientWidth < el.scrollWidth - 2;
  }

// Generic scroll function
  private scrollByCardsGeneric(ref: ElementRef, direction: 'left' | 'right', numCards: number, cardClass: string) {
    const el = ref.nativeElement;
    const card = el.querySelector(`.${cardClass}`) as HTMLElement;
    if (!card) return;
    const style = window.getComputedStyle(card);
    const cardWidth = card.offsetWidth;
    const gap = parseInt(style.marginRight) || 16;
    const scrollAmount = (cardWidth + gap) * numCards;
    el.scrollBy({ left: direction === 'right' ? scrollAmount : -scrollAmount, behavior: 'smooth' });
  }
  // -----------------------code by Hà Hiệp Thanh-----------------------------------------------------------------------------------------------
//   musicGenresList$!: Observable<MusicGenresModel[]>;
//   albumList$!: Observable<AlbumModel[]>;
//   subscriptions: Subscription[] = [];

//   constructor(
//     private router: Router,
//     private store: Store<{
//       musicGenres: MusicGenresState,
//       albums : AlbumState,
//     }>
//   ) {
//     this.musicGenresList$ = this.store.select('musicGenres', 'musicGenres');
//     this.albumList$ = this.store.select('albums', 'albumList');
//     this.getAllMusicGenres();
//     this.getAllAlbums();
//   }

//   getAllMusicGenres() {
//     this.store.dispatch(MusicGenresActions.getAllMusicGenres());
//   }

//   getAllAlbums(){
//     this.store.dispatch(AlbumActions.getAllAlbums());
//   }

//   navigateToCategoryDetail(id: string) {
//     this.router.navigate(['/category-detail', id]).then();
//   }

//   navigateToSongDetail(id: string) {
//     this.router.navigate(['/song-detail', id]).then();
//   }

  ngOnInit() {
    // this.subscriptions.push(
    //   this.musicGenresList$.subscribe((musicGenres: MusicGenresModel[]) => {
    //     console.log(musicGenres);
    //   }),
    //   this.albumList$.subscribe((albums: AlbumModel[]) => {
    //     console.log(albums);
    //   })
    // )
  }

  ngOnDestroy() {
    // this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
