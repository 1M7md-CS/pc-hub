import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../models/product-model';
import { Cart } from '../services/cart';
import { Icon } from '../shared/ui/icon/icon';

@Component({
  selector: 'app-cart',
  imports: [RouterLink, Icon],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class CartPage {
  private cartService = inject(Cart);
  readonly items = this.cartService.items;
  readonly count = this.cartService.count;
  readonly total = this.cartService.total;

  keyOf(product: Product): string {
    return this.cartService.keyOf(product);
  }

  setQuantity(key: string, quantity: number) {
    this.cartService.setQuantity(key, quantity);
  }

  onQuantityInput(key: string, raw: string) {
    const sanitized = raw.replace(/[^0-9]/g, '');
    const parsed = parseInt(sanitized, 10);
    if (!Number.isNaN(parsed)) {
      this.setQuantity(key, parsed);
    }
  }

  commitQuantity(key: string, raw: string) {
    const parsed = parseInt(raw.replace(/[^0-9]/g, ''), 10);
    this.setQuantity(key, Number.isNaN(parsed) ? 0 : parsed);
  }

  stockLevel(key: string) {
    return this.cartService.stockLevel(key);
  }

  atStockLimit(key: string) {
    return this.cartService.atStockLimit(key);
  }

  hasOutOfStock() {
    return this.cartService.hasOutOfStock();
  }

  remove(key: string) {
    this.cartService.remove(key);
  }

  clear() {
    this.cartService.clear();
  }

  orderOnWhatsApp() {
    if (this.hasOutOfStock()) return;
    const itemLines = this.items().map(
      (item, index) =>
        `${index + 1}. ${item.product.name} (${item.product.category}) x${item.quantity} = $${item.product.price * item.quantity}`,
    );
    const message = ['New PC order:', '', ...itemLines, '', `Total: $${this.total()}`, `Items: ${this.count()}`].join(
      '\n',
    );
    const url = `https://wa.me/962790902265?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  }
}
