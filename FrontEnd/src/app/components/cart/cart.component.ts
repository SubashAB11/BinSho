import { Component } from '@angular/core';
import { Product } from '../../models/product.model';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-cart',
  imports: [DragDropModule, ProductComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  cartItems: (Product | null)[] = [];

  getTotalPrice(): number {
    return this.cartItems.reduce((sum, item) => sum + (item ? item.price : 0), 0);
  }

  onDrop(event: CdkDragDrop<(Product | null)[]>) {
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

  trackByIndex(index: number, item: (Product | null)): number {
    return index;
  }
}
