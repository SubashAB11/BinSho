import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Product } from '../../models/product.model';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
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

  @ViewChild('cart', { static: true }) cartElement!: ElementRef;

  cartItems: any[] = [];

  constructor(private appService: AppService, private renderer: Renderer2) { }

  getTotalPrice(): number {
    return parseInt(this.cartItems.reduce((sum, item) => sum + (item ? item.price : 0), 0));
  }

  onDrop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) return;

    const draggedItem = event.previousContainer.data[event.previousIndex];
    if (!draggedItem) return;

    const cartRect = this.cartElement.nativeElement.getBoundingClientRect();
    const dropEvent = event.event as DragEvent;

    const draggedElement = event.item.element.nativeElement as HTMLElement;
    const productWidth = draggedElement.offsetWidth;
    const productHeight = draggedElement.offsetHeight;

    const dropX = dropEvent.clientX - cartRect.left - productWidth / 2;
    const dropY = dropEvent.clientY - cartRect.top - productHeight / 2;

    this.addAnimation(draggedItem, event.item.data);
    event.container.data.splice(event.currentIndex, 0, draggedItem);

    setTimeout(() => {
      this.positionNewlyAddedProduct(dropX, dropY);
    });
  }

  positionNewlyAddedProduct(x: number, y: number): void {
    const cartElement = this.cartElement.nativeElement as HTMLElement;
    const productElements = cartElement.querySelectorAll('#cartProduct');
    const newlyAddedProduct = productElements[productElements.length - 1] as HTMLElement;

    if (newlyAddedProduct) {
      this.renderer.setStyle(newlyAddedProduct, 'transform', `translate(${x}px, ${y}px)`);
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
