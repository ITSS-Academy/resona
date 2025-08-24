import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallAlbumComponent } from './small-album.component';

describe('SmallAlbumComponent', () => {
  let component: SmallAlbumComponent;
  let fixture: ComponentFixture<SmallAlbumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmallAlbumComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmallAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
