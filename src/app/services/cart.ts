import { computed, effect, inject, Service, signal } from '@angular/core';
import { CartItem, Product } from '../models/product-model';
import { Auth } from './auth';

const CARTS_KEY = 'pchub_carts';

@Service()
export class Cart {
  private auth = inject(Auth);
  private ownerKey = this.auth.user()?.email ?? '';
  items = signal<CartItem[]>(this.load(this.ownerKey));

  count = computed(() => this.items().reduce((sum, i) => sum + i.quantity, 0));
  total = computed(() => this.items().reduce((sum, i) => sum + i.product.price * i.quantity, 0));

  constructor() {
    effect(() => {
      const ownerKey = this.auth.user()?.email ?? '';
      if (ownerKey !== this.ownerKey) {
        this.ownerKey = ownerKey;
        this.items.set(this.load(this.ownerKey));
      }
    });
  }

  add(product: Product) {
    this.items.update((items) => {
      const existing = items.find((i) => i.product.id === product.id);
      if (existing) {
        return items.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }
      return [...items, { product, quantity: 1 }];
    });
    this.persist();
  }

  setQuantity(id: number, quantity: number) {
    if (quantity <= 0) {
      this.remove(id);
      return;
    }
    this.items.update((items) =>
      items.map((i) => (i.product.id === id ? { ...i, quantity } : i)),
    );
    this.persist();
  }

  remove(id: number) {
    this.items.update((items) => items.filter((i) => i.product.id !== id));
    this.persist();
  }

  clear() {
    this.items.set([]);
    this.persist();
  }

  private persist() {
    const carts = this.loadAll();
    carts[this.ownerKey] = this.items();
    localStorage.setItem(CARTS_KEY, JSON.stringify(carts));
  }

  private load(ownerKey: string): CartItem[] {
    return this.loadAll()[ownerKey] ?? [];
  }

  private loadAll(): Record<string, CartItem[]> {
    try {
      return JSON.parse(localStorage.getItem(CARTS_KEY) ?? '{}');
    } catch {
      return {};
    }
  }
}
