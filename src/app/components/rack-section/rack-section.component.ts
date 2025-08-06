import { Component, HostListener, OnInit } from '@angular/core';
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
export class RackSectionComponent implements OnInit {
  rackSections: { leftRack: Product[]; rightRack: Product[] }[] = [];

  ngOnInit() {
    this.loadNextRackSection();
  }

  loadNextRackSection() {
    console.log('Loading next rack section...');

    const section = {
      leftRack: this.createRandomProducts(5),
      rightRack: this.createRandomProducts(5),
    };
    this.rackSections.push(section);
  }

  rackId = 0;

  createRandomProducts(count: number): Product[] {
    const images = [
      'assets/images/item1.png',
      'assets/images/item2.png',
      'assets/images/item3.png',
      'assets/images/item4.png',
      'assets/images/item5.png',
      'assets/images/item6.png',
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

