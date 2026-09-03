import { Component, computed, inject, input, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../../models/product-model';
import { Auth } from '../../../services/auth';
import { Cart } from '../../../services/cart';
import { Icon } from '../icon/icon';

@Component({
  selector: 'app-product-card',
  imports: [Icon],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  private cart = inject(Cart);
  private auth = inject(Auth);
  private router = inject(Router);
  product = input.required<Product>();
  added = signal(false);

  atStockLimit = computed(() => {
    const p = this.product();
    return this.cart.quantityInCart(p) >= p.stock;
  });

  addToCart() {
    if (this.added()) return;
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/signin']);
      return;
    }
    const qtyBefore = this.cart.quantityInCart(this.product());
    this.cart.add(this.product());
    if (this.cart.quantityInCart(this.product()) > qtyBefore) {
      this.added.set(true);
      setTimeout(() => this.added.set(false), 1500);
    }
  }
}
