import { Component, HostListener, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { TwoDSectionComponent } from '../two-d-section/two-d-section.component';
import { CartComponent } from '../cart/cart.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MinimalistSectionComponent } from '../minimalist-section/minimalist-section.component';
import { Themes } from '../../shared/themes';
import { CyberpunkSectionComponent } from '../cyberpunk-section/cyberpunk-section.component';
import { Section } from '../../models/section.model';

@Component({
  selector: 'app-rack-section',
  imports: [TwoDSectionComponent, CartComponent, DragDropModule, MinimalistSectionComponent, CyberpunkSectionComponent],
  templateUrl: './rack-section.component.html',
  styleUrl: './rack-section.component.scss'
})
export class RackSectionComponent implements OnInit {
  rackSections: Section[] = [];
  readonly Themes = Themes;

  ngOnInit() {
    this.loadNextRackSection();
  }

  secId = 0;
  loadNextRackSection() {
    const thm = Math.random() > 0.5 ? Themes.TWO_D : Math.random() > 0.5 ? Themes.CYBERPUNK : Themes.MINIMALIST;
    for (let i = 0; i < 2; i++) {
      const section = {
        id: this.secId,
        leftRack: this.createRandomProducts(4, thm),
        rightRack: this.createRandomProducts(4, thm),
        theme: thm
      };
      this.rackSections.push(section);
    }

    if (this.rackSections.length > 9) {
      this.rackSections.splice(0, 2);
    }

    this.secId++;
  }

  rackId = 0;

  createRandomProducts(count: number, theme: string): Product[] {
    const images = theme === Themes.MINIMALIST ?
    ['mini1.png', 'mini2.png', 'mini3.png', 'mini4.png', 'mini5.png', 'mini6.png', 'mini7.png'] :
    theme === Themes.TWO_D ? ['item1.svg', 'item2.svg', 'item3.svg', 'item4.svg', 'item5.svg', 'item6.svg', 'item7.svg', 'item8.svg'] :
    ['cyber1.png', 'cyber2.png', 'cyber3.png', 'cyber4.png', 'cyber5.png', 'cyber6.png', 'cyber7.png', 'cyber8.png'];


    const products: Product[] = [];

    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * images.length);
      const randomPrice = parseInt((Math.random() * 1000 + 100).toFixed(2));

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

