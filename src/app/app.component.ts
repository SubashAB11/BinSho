import { Component, OnInit } from '@angular/core';
import { RackSectionComponent } from './components/rack-section/rack-section.component';

@Component({
  selector: 'app-root',
  imports: [RackSectionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'FrontEnd';
  isMobileOrTablet = false;

  ngOnInit(): void {
    this.checkDevice();
    window.addEventListener('resize', () => this.checkDevice());
  }

  checkDevice() {
    const width = window.innerWidth;
    this.isMobileOrTablet = width <= 1024;
  }

}
