import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { forkJoin, map } from 'rxjs';
import { Category, Product } from '../models/product-model';

@Service()
export class ProductsService {
  private httpClient = inject(HttpClient);

  get categories() {
    return this.httpClient.get<Category[]>('data/categories.json');
  }

  get featuredProducts() {
    return forkJoin({
      pre_built_pc: this.httpClient.get<Product[]>('data/pre-built-pcs.json'),
      gpu: this.httpClient.get<Product[]>('data/gpu.json'),
      cpu: this.httpClient.get<Product[]>('data/cpu.json'),
      ram: this.httpClient.get<Product[]>('data/ram.json'),
      storage: this.httpClient.get<Product[]>('data/storage.json'),
    }).pipe(
      map(({ pre_built_pc, gpu, cpu, ram, storage }) => [
        pre_built_pc[0],
        gpu[0],
        cpu[0],
        ram[0],
        storage[0],
      ]),
    );
  }

  get icons() {
    return this.httpClient.get<Record<string, string[]>>('data/icons.json');
  }
}
