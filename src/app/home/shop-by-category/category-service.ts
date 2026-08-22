import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Category } from './category-model';

@Service()
export class CategoryService {
  private http = inject(HttpClient);

  get categories() {
    return this.http.get<Category[]>('data/categories.json');
  }
}
