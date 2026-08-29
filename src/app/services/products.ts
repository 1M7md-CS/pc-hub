import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { forkJoin, map } from 'rxjs';
import { Icon } from '../models/icon-model';
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
      map(({ pre_built_pc, gpu, cpu, ram, storage }) => [
        ...pre_built_pc.slice(0, 2),
        ...gpu.slice(0, 2),
        ...cpu.slice(0, 2),
        ...ram.slice(0, 2),
        ...storage.slice(0, 2),
      ]),
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

  geticon() {
    return this.httpClient.get<Icon[]>(`data/icons.json`);
  }
}
