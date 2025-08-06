import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RackSectionComponent } from './rack-section.component';

describe('RackSectionComponent', () => {
  let component: RackSectionComponent;
  let fixture: ComponentFixture<RackSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RackSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RackSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
