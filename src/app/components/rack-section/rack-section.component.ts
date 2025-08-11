import { Component, HostListener, OnInit, AfterViewInit, OnDestroy, ChangeDetectorRef, NgZone } from '@angular/core';
import { TwoDSectionComponent } from '../two-d-section/two-d-section.component';
import { MinimalistSectionComponent } from '../minimalist-section/minimalist-section.component';
import { CyberpunkSectionComponent } from '../cyberpunk-section/cyberpunk-section.component';
import { CartComponent } from '../cart/cart.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { Section } from '../../models/section.model';
import { Product } from '../../models/product.model';
import { Themes } from '../../shared/themes';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { CommonModule } from '@angular/common';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-rack-section',
  standalone: true,
  imports: [
    CommonModule,
    TwoDSectionComponent,
    MinimalistSectionComponent,
    CyberpunkSectionComponent,
    CartComponent,
    DragDropModule
  ],
  templateUrl: './rack-section.component.html',
  styleUrls: ['./rack-section.component.scss']
})
export class RackSectionComponent implements OnInit, AfterViewInit, OnDestroy {
  readonly Themes = Themes;
  rackSections: Section[] = [];
  allThemes = [Themes.TWO_D, Themes.MINIMALIST, Themes.CYBERPUNK];

  secId = 0;
  rackId = 0;

  readonly GROUP_SIZE = 3;

  currentCartImage = '';
  nextCartImage = '';
  currentTheme: string = Themes.MINIMALIST;

  themeCartMap: Record<string, string> = {
    [Themes.TWO_D]: 'assets/images/cart_img_2d.png',
    [Themes.MINIMALIST]: 'assets/images/cart_img_minimalist.png',
    [Themes.CYBERPUNK]: 'assets/images/cart_img_cyberpunk.png'
  };

  triggers: any[] = [];

  scrollReady = false;

  onRefreshInitHandler = () => {
    this.scrollReady = false;
    gsap.set('.cart-current', { clipPath: 'inset(0% -20% 0% -20%)' });
    gsap.set('.cart-next', { clipPath: 'inset(100% -20% 0% -20%)' });
  };

  onRefreshHandler = () => {
    this.scrollReady = true;
  };

  constructor(private cd: ChangeDetectorRef, private ngZone: NgZone) { }

  ngOnInit(): void {
    this.createSectionGroup(Themes.MINIMALIST);
    this.createSectionGroup();


    this.currentCartImage = this.themeCartMap[this.rackSections[0].theme];
    this.nextCartImage = this.themeCartMap[this.rackSections[this.GROUP_SIZE].theme];
  }

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      requestAnimationFrame(() => {
        gsap.set('.cart-current', { clipPath: 'inset(0% -20% 0% -20%)' });
        gsap.set('.cart-next', { clipPath: 'inset(100% -20% 0% -20%)' });

        ScrollTrigger.addEventListener('refreshInit', this.onRefreshInitHandler);
        ScrollTrigger.addEventListener('refresh', this.onRefreshHandler);

        this.setupScrollTriggers();
        ScrollTrigger.refresh();
      });
    });
  }

  ngOnDestroy(): void {
    ScrollTrigger.getAll().forEach(t => t.kill());
    ScrollTrigger.removeEventListener('refreshInit', this.onRefreshInitHandler);
    ScrollTrigger.removeEventListener('refresh', this.onRefreshHandler);
    this.triggers = [];
  }

  createSectionGroup(theme?: string) {
    const lastTheme = this.rackSections[this.rackSections.length - 1]?.theme;
    const availableThemes = this.allThemes.filter(t => t !== lastTheme);
    const thm = theme ?? availableThemes[Math.floor(Math.random() * availableThemes.length)];

    for (let i = 0; i < this.GROUP_SIZE; i++) {
      const section: Section = {
        id: this.secId++,
        leftRack: this.createRandomProducts(4, thm),
        rightRack: this.createRandomProducts(4, thm),
        theme: thm
      };
      this.rackSections.push(section);
    }
  }

  createRandomProducts(count: number, theme: string): Product[] {
    const images =
      theme === Themes.MINIMALIST
        ? ['mini1.png', 'mini2.png', 'mini3.png', 'mini4.png', 'mini5.png', 'mini6.png', 'mini7.png']
        : theme === Themes.TWO_D
          ? ['item1.svg', 'item2.svg', 'item3.svg', 'item4.svg', 'item5.svg', 'item6.svg', 'item7.svg', 'item8.svg']
          : ['cyber1.png', 'cyber2.png', 'cyber3.png', 'cyber4.png', 'cyber5.png', 'cyber6.png', 'cyber7.png', 'cyber8.png'];

    const products: Product[] = [];
    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * images.length);
      const randomPrice = parseInt((Math.random() * 1000 + 100).toFixed(2), 10);

      products.push({
        id: this.rackId++,
        name: `Item ${this.rackId}`,
        image: images[randomIndex],
        price: randomPrice
      });
    }
    return products;
  }

  setupScrollTriggers() {
    ScrollTrigger.getAll().forEach(t => t.kill());
    this.triggers = [];
    for (let groupIndex = 0; groupIndex < 2; groupIndex++) {
      const anchorIndex = groupIndex * this.GROUP_SIZE;
      const section = this.rackSections[anchorIndex];
      if (!section) continue;

      const selector = `.section-${section.id}`;
      const el = document.querySelector(selector) as HTMLElement;
      if (!el) {
        continue;
      }

      const st = ScrollTrigger.create({
        trigger: el,
        start: 'top bottom',
        end: 'top top',
        scrub: true,
        onUpdate: self => {
          if (!this.scrollReady) return;

          const p = self.progress;

          gsap.set('.cart-current', { clipPath: `inset(0% -20% ${p * 100}% -20%)` });

          gsap.set('.cart-next', { clipPath: `inset(${(1 - p) * 100}% -20% 0% -20%)` });
        }
      });

      this.triggers.push(st);
    }
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    const threshold = 100;
    const position = window.innerHeight + window.scrollY;
    const height = document.body.offsetHeight;

    const sections = document.querySelectorAll<HTMLElement>('[class^="section-"]');
    let newTheme = this.currentTheme;

    for (let i = 0; i < sections.length; i++) {
      const rect = sections[i].getBoundingClientRect();
      if (rect.top <= 50 && rect.bottom > 50) {
        const sectionId = parseInt(sections[i].className.match(/section-(\d+)/)?.[1] || '', 10);
        const sectionObj = this.rackSections.find(s => s.id === sectionId);
        if (sectionObj && sectionObj.theme !== this.currentTheme) {
          newTheme = sectionObj.theme;
        }
        break;
      }
    }

    if (newTheme !== this.currentTheme) {
      this.currentTheme = newTheme;
      this.cd.detectChanges(); // Update <app-cart>
    }

    if (position >= height - threshold) {
      this.ngZone.run(() => this.loadNextLogicalSection());
    }
  }

  loadNextLogicalSection() {
    this.createSectionGroup();

    setTimeout(() => {
      this.rackSections.splice(0, this.GROUP_SIZE);

      const upcoming = this.rackSections[this.GROUP_SIZE];
      const upcomingImage = upcoming ? this.themeCartMap[upcoming.theme] : this.nextCartImage;

      gsap.set('.cart-next', { clipPath: 'inset(100% -20% 0% -20%)' });

      this.currentCartImage = this.nextCartImage;
      this.nextCartImage = upcomingImage;
      this.cd.detectChanges();

      gsap.set('.cart-current', { clipPath: 'inset(0% -20% 0% -20%)' });
      gsap.set('.cart-next', { clipPath: 'inset(100% -20% 0% -20%)' });

      this.ngZone.runOutsideAngular(() => requestAnimationFrame(() => {
        this.setupScrollTriggers();
        ScrollTrigger.refresh();
      }));
    }, 40);
  }

  trackById(_: number, item: Section) {
    return item.id;
  }
}
