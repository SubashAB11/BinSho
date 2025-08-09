import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { ProductComponent } from '../product/product.component';
import { AppService } from '../../services/app.service';
import { Observable, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-rack',
  imports: [DragDropModule, ProductComponent, AsyncPipe],
  templateUrl: './rack.component.html',
  styleUrl: './rack.component.scss'
})
export class RackComponent implements OnInit {
  @Input({ required: true }) products: (Product | null)[] = [];
  @Input({ required: true }) rackSide!: string;
  @Input({ required: true }) theme!: string;

  isAnimating!: Observable<boolean>;

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.isAnimating = this.appService.getAnimating();
  }

  onDrop(event: CdkDragDrop<(Product | null)[] | Product[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }
  }

}
