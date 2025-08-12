import { Component, Input } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { RackComponent } from '../rack/rack.component';
import { Section } from '../../models/section.model';
import { Themes } from '../../shared/themes';

@Component({
  selector: 'app-minimalist-section',
  imports: [DragDropModule, RackComponent],
  templateUrl: './minimalist-section.component.html',
  styleUrl: './minimalist-section.component.scss'
})
export class MinimalistSectionComponent {
  @Input({ required: true }) section!: Section;
  readonly Themes = Themes;
}
