import { Component, Input } from '@angular/core';
import { Product } from '../../models/product.model';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CartComponent } from '../cart/cart.component';
import { RackComponent } from '../rack/rack.component';

@Component({
  selector: 'app-two-d-section',
  imports: [DragDropModule, CartComponent, RackComponent],
  templateUrl: './two-d-section.component.html',
  styleUrl: './two-d-section.component.scss'
})
export class TwoDSectionComponent {
  @Input() rackSections: { leftRack: Product[]; rightRack: Product[] }[] = [];
}
