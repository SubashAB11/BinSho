import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Product } from '../../models/product.model';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
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

    const newItem = {
      ...draggedItem,
      x: dropX,
      y: dropY
    };

    this.addAnimation(newItem, event.item.data);
    this.cartItems.push(newItem);
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
}
