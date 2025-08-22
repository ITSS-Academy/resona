import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaybarSongDetailComponent } from './playbar-song-detail.component';

describe('PlaybarSongDetailComponent', () => {
  let component: PlaybarSongDetailComponent;
  let fixture: ComponentFixture<PlaybarSongDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaybarSongDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaybarSongDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
