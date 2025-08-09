import { Component, HostListener, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { TwoDSectionComponent } from '../two-d-section/two-d-section.component';
import { CartComponent } from '../cart/cart.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-rack-section',
  imports: [TwoDSectionComponent, CartComponent, DragDropModule],
  templateUrl: './rack-section.component.html',
  styleUrl: './rack-section.component.scss'
})
export class RackSectionComponent implements OnInit {
  rackSections: { leftRack: Product[]; rightRack: Product[] }[] = [];

  ngOnInit() {
    this.loadNextRackSection();
  }

  loadNextRackSection() {
    const section = {
      leftRack: this.createRandomProducts(4),
      rightRack: this.createRandomProducts(4),
    };
    this.rackSections.push(section);
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
    const position = window.innerHeight + window.scrollY;
    const height = document.body.offsetHeight;

    if (position >= height - threshold) {
      this.loadNextRackSection();
    }
  }
}

