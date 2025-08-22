import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullAlbumDetailComponent } from './full-album-detail.component';

describe('FullAlbumDetailComponent', () => {
  let component: FullAlbumDetailComponent;
  let fixture: ComponentFixture<FullAlbumDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FullAlbumDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FullAlbumDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
