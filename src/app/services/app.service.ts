import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private isAnimating = new BehaviorSubject<boolean>(false);

  constructor() { }

  setAnimating(value: boolean) {
    this.isAnimating.next(value);
  }

  getAnimating() {
    return this.isAnimating.asObservable();
  }
}
