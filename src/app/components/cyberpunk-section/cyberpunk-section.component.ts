import { Component, Input } from '@angular/core';
import { Section } from '../../models/section.model';
import { Themes } from '../../shared/themes';
import { RackComponent } from '../rack/rack.component';

@Component({
  selector: 'app-cyberpunk-section',
  imports: [RackComponent],
  templateUrl: './cyberpunk-section.component.html',
  styleUrl: './cyberpunk-section.component.scss'
})
export class CyberpunkSectionComponent {
  @Input({ required: true }) section!: Section;
  readonly Themes = Themes;
}
