import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedivalSectionComponent } from './medival-section.component';

describe('MedivalSectionComponent', () => {
  let component: MedivalSectionComponent;
  let fixture: ComponentFixture<MedivalSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedivalSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedivalSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
