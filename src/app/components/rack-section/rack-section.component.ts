import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { RackComponent } from '../rack/rack.component';
import { CartComponent } from '../cart/cart.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-rack-section',
  imports: [RackComponent, CartComponent, DragDropModule],
  templateUrl: './rack-section.component.html',
  styleUrl: './rack-section.component.scss'
})
export class RackSectionComponent implements OnInit, AfterViewInit {
  rackSections: { leftRack: Product[]; rightRack: Product[] }[] = [];
  isLoading = false;

  ngOnInit() {
    const section = {
      leftRack: this.createRandomProducts(4),
      rightRack: this.createRandomProducts(4),
    };
    this.rackSections.push(section);
  }

  ngAfterViewInit(): void {
    this.scrollToBottom();
  }

  scrollToBottom() {
    requestAnimationFrame(() => {
      window.scrollTo({ top: document.body.scrollHeight });
    });
  }

  async loadNextRackSection() {
    const oldScrollHeight = document.documentElement.scrollHeight;
    const oldScrollTop = window.scrollY;

    const section = {
      leftRack: this.createRandomProducts(4),
      rightRack: this.createRandomProducts(4),
    };
    this.rackSections.unshift(section);

    await new Promise(resolve => setTimeout(resolve, 0));

    requestAnimationFrame(() => {
      const newScrollHeight = document.documentElement.scrollHeight;
      const delta = newScrollHeight - oldScrollHeight;
      window.scrollTo({ top: oldScrollTop + delta });
    });
  }

  rackId = 0;
  createRandomProducts(count: number): Product[] {
    const images = [
      'item1',
      'item2',
      'item3',
      'item4',
      'item5',
      'item6',
    ];

    const products: Product[] = [];

    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * images.length);
      const randomPrice = parseFloat((Math.random() * 1000 + 100).toFixed(2));

      products.push({
        id: this.rackId,
        name: `Item ${this.rackId}`,
        image: images[randomIndex],
        price: randomPrice,
      });

      this.rackId++;
    }

    return products;
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    const threshold = 100;
    const scrollTop = window.scrollY;

    if (scrollTop <= threshold && !this.isLoading) {
      this.isLoading = true;
      this.loadNextRackSection().then(() => {
        this.isLoading = false;
      });
    }
  }
}

