import { Component } from '@angular/core';
import { Product } from '../../models/product.model';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
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
      const draggedItem = event.previousContainer.data[event.previousIndex];
      this.addAnimation(draggedItem, event.item.data);
      if (draggedItem) {
        event.container.data.splice(event.currentIndex, 0, draggedItem);
      }
    }
  }

  addAnimation(draggedItem: Product | null, side: string) {
    const productElement = document.querySelector(`#product-${draggedItem?.id}`);
    const reload = side === 'left' ? 'reloading-left' : 'reloading-right';
    if (productElement) {
      productElement.classList.add(reload);
      setTimeout(() => {
        productElement.classList.remove(reload);
      }, 700);
    }
  }

  trackByIndex(index: number, item: (Product | null)): number {
    return index;
  }
}
