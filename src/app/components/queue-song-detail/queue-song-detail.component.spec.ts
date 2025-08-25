import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueueSongDetailComponent } from './queue-song-detail.component';

describe('QueueSongDetailComponent', () => {
  let component: QueueSongDetailComponent;
  let fixture: ComponentFixture<QueueSongDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QueueSongDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QueueSongDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
