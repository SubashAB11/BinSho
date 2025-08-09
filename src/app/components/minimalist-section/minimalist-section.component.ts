import { Component, Input } from '@angular/core';
import { Product } from '../../models/product.model';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { RackComponent } from '../rack/rack.component';

@Component({
  selector: 'app-minimalist-section',
  imports: [DragDropModule, RackComponent],
  templateUrl: './minimalist-section.component.html',
  styleUrl: './minimalist-section.component.scss'
})
export class MinimalistSectionComponent {
  @Input({ required: true }) section!: { leftRack: Product[]; rightRack: Product[] };
}
