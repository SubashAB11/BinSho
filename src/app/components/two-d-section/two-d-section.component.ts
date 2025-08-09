import { Component, Input } from '@angular/core';
import { Product } from '../../models/product.model';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { RackComponent } from '../rack/rack.component';

@Component({
  selector: 'app-two-d-section',
  imports: [DragDropModule, RackComponent],
  templateUrl: './two-d-section.component.html',
  styleUrl: './two-d-section.component.scss'
})
export class TwoDSectionComponent {
  @Input({ required: true }) section!: { leftRack: Product[]; rightRack: Product[] };
}
