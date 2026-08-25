import { Component, computed, input } from '@angular/core';
import { Product } from '../../../models/product-model';

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  product = input.required<Product>();
  iconPaths = computed(() => this.product().iconPaths ?? []);
}
