import { Component, Input } from '@angular/core';
import { Section } from '../../models/section.model';
import { Themes } from '../../shared/themes';
import { RackComponent } from '../rack/rack.component';

@Component({
  selector: 'app-medieval-section',
  imports: [RackComponent],
  templateUrl: './medieval-section.component.html',
  styleUrl: './medieval-section.component.scss'
})
export class MedievalSectionComponent {
  @Input({ required: true }) section!: Section;
  readonly Themes = Themes;
}
