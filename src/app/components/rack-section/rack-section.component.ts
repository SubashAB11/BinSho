import { Component, HostListener, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { TwoDSectionComponent } from '../two-d-section/two-d-section.component';
import { CartComponent } from '../cart/cart.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MinimalistSectionComponent } from '../minimalist-section/minimalist-section.component';

@Component({
  selector: 'app-rack-section',
  imports: [TwoDSectionComponent, CartComponent, DragDropModule, MinimalistSectionComponent],
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
    // const images = [
    //   'item1.svg',
    //   'item2.svg',
    //   'item3.svg',
    //   'item4.svg',
    //   'item5.svg',
    //   'item6.svg',
    //   'item7.svg',
    //   'item8.svg',
    // ];
    
    const images = [
      'mini1.png',
      'mini2.png',
      'mini3.png',
      'mini4.png',
      'mini5.png',
      'mini6.png',
      'mini7.png',
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

