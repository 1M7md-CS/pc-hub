import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { forkJoin, map } from 'rxjs';
import { Category, Product } from '../models/product-model';

@Service()
export class ProductsService {
  private httpClient = inject(HttpClient);

  get productOfTheMonth() {
    return this.httpClient.get<Product>('data/product-of-the-month.json');
  }

  get categories() {
    return this.httpClient.get<Category[]>('data/categories.json');
  }

  get featuredProducts() {
    return forkJoin({
      pre_built_pc: this.httpClient.get<Product[]>('data/pre-built-pcs.json'),
      gpu: this.httpClient.get<Product[]>('data/gpu.json'),
      cpu: this.httpClient.get<Product[]>('data/processors.json'),
      ram: this.httpClient.get<Product[]>('data/ram.json'),
      storage: this.httpClient.get<Product[]>('data/storage.json'),
    }).pipe(
      map(({ pre_built_pc, gpu, cpu, ram, storage }) => {
        const candidates = [
          ...pre_built_pc.slice(0, 2),
          ...gpu.slice(0, 2),
          ...cpu.slice(0, 2),
          ...ram.slice(0, 2),
          ...storage.slice(0, 2),
        ].filter((p) => p.stock > 0);
        return this.shuffle(candidates);
      }),
    );
  }

  getCategory(slug: string) {
    return this.categories.pipe(
      map((categories) => categories.find((category) => category.link === `/products/${slug}`)),
    );
  }

  getProducts(slug: string) {
    return this.httpClient.get<Product[]>(`data/${slug}.json`);
  }

  private shuffle<T>(arr: T[]): T[] {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }
}
