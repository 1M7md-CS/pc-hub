import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
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

  setQuantity(id: number, quantity: number) {
    this.cartService.setQuantity(id, quantity);
  }

  remove(id: number) {
    this.cartService.remove(id);
  }

  clear() {
    this.cartService.clear();
  }

  orderOnWhatsApp() {
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
