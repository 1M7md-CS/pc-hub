import { Component, input } from '@angular/core';
import { Product } from '../../../models/product-model';
import { Icon } from '../icon/icon';

@Component({
  selector: 'app-product-card',
  imports: [Icon],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  product = input.required<Product>();
}
