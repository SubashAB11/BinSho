import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CyberpunkSectionComponent } from './cyberpunk-section.component';

describe('CyberpunkSectionComponent', () => {
  let component: CyberpunkSectionComponent;
  let fixture: ComponentFixture<CyberpunkSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CyberpunkSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CyberpunkSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
