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
  stockLeft = computed(() => {
    const map = new Map<number, number>();
    for (const item of this.items()) {
      map.set(item.product.id, item.product.stock - item.quantity);
    }
    return map;
  });

  stockLevel(id: number): number {
    return this.stockLeft().get(id) ?? 0;
  }

  atStockLimit(id: number): boolean {
    return this.stockLevel(id) <= 0;
  }

  hasOutOfStock() {
    return this.items().some((i) => i.product.stock <= 0);
  }

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
    if (product.stock <= 0) return;
    this.items.update((items) => {
      const existing = items.find((i) => i.product.id === product.id);
      if (existing) {
        if (existing.quantity >= product.stock) return items;
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
      items.map((i) => {
        if (i.product.id !== id) return i;
        const clamped = Math.min(quantity, i.product.stock);
        return { ...i, quantity: Math.max(1, clamped) };
      }),
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
