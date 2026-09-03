import { Component, inject, input, signal } from '@angular/core';
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

  addToCart() {
    if (this.added()) return;
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }
    this.cart.add(this.product());
    this.added.set(true);
    setTimeout(() => this.added.set(false), 1500);
  }
}
