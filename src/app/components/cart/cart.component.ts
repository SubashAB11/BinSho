import { Component } from '@angular/core';
import { Product } from '../../models/product.model';
import { CdkDragDrop, CdkDragEnd, DragDropModule } from '@angular/cdk/drag-drop';
import { ProductComponent } from '../product/product.component';
import { timer } from 'rxjs';
import { AppService } from '../../services/app.service';
import { MovableDirective } from '../../directives/movable.directive';

@Component({
  selector: 'app-cart',
  imports: [DragDropModule, ProductComponent, MovableDirective],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  cartItems: Product[] = [];

  constructor(private appService: AppService) { }

  getTotalPrice(): number {
    return this.cartItems.reduce((sum, item) => sum + (item ? item.price : 0), 0);
  }

  onDrop(event: CdkDragDrop<Product[]>) {
    if (event.previousContainer === event.container) return;
    const draggedItem = event.previousContainer.data[event.previousIndex];
    this.addAnimation(draggedItem, event.item.data);
    if (draggedItem) {
      event.container.data.splice(event.currentIndex, 0, draggedItem);
    }
  }

  addAnimation(draggedItem: Product, side: string) {
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

  trackByIndex(index: number, item: Product): number {
    return index;
  }
}
