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
  private pos = { x: 0, y: 0 };
  private cartBounds!: DOMRect;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngAfterViewInit() {
    const cart = document.getElementById('cartDropList');
    if (cart) {
      this.cartBounds = cart.getBoundingClientRect();
    }
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    event.preventDefault();

    const startX = event.clientX;
    const startY = event.clientY;
    const element = this.el.nativeElement;
    const transform = window.getComputedStyle(element).transform;

    let offsetX = 0, offsetY = 0;
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
      const newX = offsetX + dx;
      const newY = offsetY + dy;

      const parent = this.cartBounds;
      const elem = element.getBoundingClientRect();

      const minX = 0;
      const minY = 0;
      const maxX = parent.width - elem.width;
      const maxY = parent.height - elem.height;

      const clampedX = Math.min(Math.max(newX, minX), maxX);
      const clampedY = Math.min(Math.max(newY, minY), maxY);

      this.renderer.setStyle(
        element,
        'transform',
        `translate(${clampedX}px, ${clampedY}px)`
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
