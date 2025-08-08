import {
  Directive,
  ElementRef,
  HostListener,
  Renderer2,
  AfterViewInit,
} from '@angular/core';

@Directive({
  selector: '[appMovable]',
  standalone: true,
})
export class MovableDirective implements AfterViewInit {
  private cartBounds!: DOMRect;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngAfterViewInit() {
    const cart = document.getElementById('cartDropList');
    if (cart) {
      const originalTransform = cart.style.transform;
      cart.style.transform = 'none';
      this.cartBounds = cart.getBoundingClientRect();
      cart.style.transform = originalTransform;
    }
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    event.preventDefault();

    const startX = event.clientX;
    const startY = event.clientY;
    const element = this.el.nativeElement;
    const transform = window.getComputedStyle(element).transform;

    let offsetX = 0,
      offsetY = 0;
    if (transform !== 'none') {
      const match = transform.match(/matrix.*\((.+)\)/);
      if (match) {
        const values = match[1].split(', ');
        offsetX = parseFloat(values[4]);
        offsetY = parseFloat(values[5]);
      }
    }

    const mouseMove = (moveEvent: MouseEvent) => {
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;

      let newX = offsetX + dx;
      let newY = offsetY + dy;

      const elementRect = element.getBoundingClientRect();
      const elemWidth = elementRect.width;
      const elemHeight = elementRect.height;

      const progress = newY / (this.cartBounds.height - elemHeight);

      const perspectiveBoost = 40; // adjust based on rotation
      const maxX = this.cartBounds.width - elemWidth + progress * perspectiveBoost;
      const maxY = this.cartBounds.height - elemHeight;

      newX = Math.max(0, Math.min(newX, maxX));
      newY = Math.max(0, Math.min(newY, maxY));

      this.renderer.setStyle(
        element,
        'transform',
        `translate(${newX}px, ${newY}px)`
      );
    };


    const mouseUp = () => {
      document.removeEventListener('mousemove', mouseMove);
      document.removeEventListener('mouseup', mouseUp);
    };

    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseup', mouseUp);
  }
}
