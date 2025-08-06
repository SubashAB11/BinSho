import { Component } from '@angular/core';
import { RackSectionComponent } from './components/rack-section/rack-section.component';

@Component({
  selector: 'app-root',
  imports: [RackSectionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'FrontEnd';
}
