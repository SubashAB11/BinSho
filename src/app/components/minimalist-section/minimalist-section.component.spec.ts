import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinimalistSectionComponent } from './minimalist-section.component';

describe('MinimalistSectionComponent', () => {
  let component: MinimalistSectionComponent;
  let fixture: ComponentFixture<MinimalistSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinimalistSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinimalistSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
