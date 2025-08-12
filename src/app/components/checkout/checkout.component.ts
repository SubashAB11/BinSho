import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from '../../models/product.model';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-checkout',
  imports: [CurrencyPipe],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {
  finalProducts: { id: number; name: string; price: number; quantity: number }[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { products: Product[], total: number },
    public dialogRef: MatDialogRef<CheckoutComponent>
  ) {
    const map = new Map<number, { id: number; name: string; price: number; quantity: number }>();

    data.products.forEach(p => {
      if (map.has(p.id)) {
        map.get(p.id)!.quantity++;
      } else {
        map.set(p.id, { ...p, quantity: 1 });
      }
    });

    this.finalProducts = Array.from(map.values());
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
