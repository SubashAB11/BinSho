import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoDSectionComponent } from './two-d-section.component';

describe('TwoDSectionComponent', () => {
  let component: TwoDSectionComponent;
  let fixture: ComponentFixture<TwoDSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TwoDSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TwoDSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
