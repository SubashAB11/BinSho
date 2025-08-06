import { Component, Input } from '@angular/core';
import { Product } from '../../models/product.model';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-rack',
  imports: [DragDropModule, ProductComponent],
  templateUrl: './rack.component.html',
  styleUrl: './rack.component.scss'
})
export class RackComponent {
  @Input() products: (Product | null)[] = [];

  onDrop(event: CdkDragDrop<(Product | null)[] | Product[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

}
