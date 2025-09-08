import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistMusicTabComponent } from './playlist-music-tab.component';

describe('PlaylistMusicTabComponent', () => {
  let component: PlaylistMusicTabComponent;
  let fixture: ComponentFixture<PlaylistMusicTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaylistMusicTabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaylistMusicTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
