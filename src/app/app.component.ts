import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RackSectionComponent } from './components/rack-section/rack-section.component';

@Component({
  selector: 'app-root',
  imports: [RackSectionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'FrontEnd';
  isMobileOrTablet = false;
  isLoading = true;

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.checkDevice();
    window.addEventListener('resize', () => this.checkDevice());
  }

  ngAfterViewInit(): void {
    const images = Array.from(document.images);
    let loadedCount = 0;

    if (images.length === 0) {
      this.isLoading = false;
      this.cd.detectChanges();
      return;
    }

    const checkIfAllLoaded = () => {
      loadedCount++;
      if (loadedCount === images.length) {
        this.isLoading = false;
        this.cd.detectChanges();
      }
    };

    images.forEach(img => {
      if (img.complete) {
        checkIfAllLoaded();
      } else {
        img.addEventListener('load', checkIfAllLoaded);
        img.addEventListener('error', checkIfAllLoaded); // still proceed on error
      }
    });
  }

  checkDevice() {
    const width = window.innerWidth;
    this.isMobileOrTablet = width <= 1024;
  }

}
