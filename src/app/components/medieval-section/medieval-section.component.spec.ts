import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedievalSectionComponent } from './medieval-section.component';

describe('MedievalSectionComponent', () => {
  let component: MedievalSectionComponent;
  let fixture: ComponentFixture<MedievalSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedievalSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedievalSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
