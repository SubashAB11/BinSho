import { Component, Input } from '@angular/core';
import { Product } from '../../models/product.model';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-product',
  imports: [DragDropModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  @Input() product: Product | undefined | null;
}
