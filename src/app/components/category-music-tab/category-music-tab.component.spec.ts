import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryMusicTabComponent } from './category-music-tab.component';

describe('CategoryMusicTabComponent', () => {
  let component: CategoryMusicTabComponent;
  let fixture: ComponentFixture<CategoryMusicTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryMusicTabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryMusicTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
