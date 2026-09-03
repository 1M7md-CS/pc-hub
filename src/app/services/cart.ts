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
    const map = new Map<string, number>();
    for (const item of this.items()) {
      map.set(this.keyOf(item.product), item.product.stock - item.quantity);
    }
    return map;
  });

  keyOf(product: Product): string {
    return `${product.id}::${product.category}`;
  }

  quantityInCart(product: Product): number {
    return this.items().find((i) => this.keyOf(i.product) === this.keyOf(product))?.quantity ?? 0;
  }

  stockLevel(key: string): number {
    return this.stockLeft().get(key) ?? 0;
  }

  atStockLimit(key: string): boolean {
    return this.stockLevel(key) <= 0;
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
    const key = this.keyOf(product);
    this.items.update((items) => {
      const existing = items.find((i) => this.keyOf(i.product) === key);
      if (existing) {
        if (existing.quantity >= product.stock) return items;
        return items.map((i) =>
          this.keyOf(i.product) === key ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }
      return [...items, { product, quantity: 1 }];
    });
    this.persist();
  }

  setQuantity(key: string, quantity: number) {
    if (quantity <= 0) {
      this.remove(key);
      return;
    }
    this.items.update((items) =>
      items.map((i) => {
        if (this.keyOf(i.product) !== key) return i;
        const clamped = Math.min(Math.floor(quantity), i.product.stock);
        return { ...i, quantity: Math.max(1, clamped) };
      }),
    );
    this.persist();
  }

  remove(key: string) {
    this.items.update((items) => items.filter((i) => this.keyOf(i.product) !== key));
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
