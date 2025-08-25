import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeOptionsButtonComponent } from './three-options-button.component';

describe('ThreeOptionsButtonComponent', () => {
  let component: ThreeOptionsButtonComponent;
  let fixture: ComponentFixture<ThreeOptionsButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThreeOptionsButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThreeOptionsButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
