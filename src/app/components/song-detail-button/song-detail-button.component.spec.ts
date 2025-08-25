import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongDetailButtonComponent } from './song-detail-button.component';

describe('SongDetailButtonComponent', () => {
  let component: SongDetailButtonComponent;
  let fixture: ComponentFixture<SongDetailButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SongDetailButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SongDetailButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
