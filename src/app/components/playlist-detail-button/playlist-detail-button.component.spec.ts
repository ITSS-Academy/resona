import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistDetailButtonComponent } from './playlist-detail-button.component';

describe('PlaylistDetailButtonComponent', () => {
  let component: PlaylistDetailButtonComponent;
  let fixture: ComponentFixture<PlaylistDetailButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaylistDetailButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaylistDetailButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
