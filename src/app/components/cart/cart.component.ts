import { Component } from '@angular/core';
import { Product } from '../../models/product.model';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { ProductComponent } from '../product/product.component';
import { timer } from 'rxjs';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-cart',
  imports: [DragDropModule, ProductComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  cartItems: (Product | null)[] = [];

  constructor(private appService: AppService) { }

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
      this.appService.setAnimating(true);
      timer(500).subscribe(() => {
        this.appService.setAnimating(false);
        productElement.classList.remove(reload);
      });
    }
  }

  trackByIndex(index: number, item: (Product | null)): number {
    return index;
  }
}
