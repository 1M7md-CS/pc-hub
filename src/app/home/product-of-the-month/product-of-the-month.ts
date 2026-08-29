import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../models/product-model';
import { ProductsService } from '../../services/products';
import { LoadState, loadState } from '../../shared/async-state';
import { Skeleton } from '../../shared/ui/skeleton/skeleton';

@Component({
  selector: 'app-build-of-the-month',
  templateUrl: './product-of-the-month.html',
  styleUrl: './product-of-the-month.css',
  imports: [RouterLink, Skeleton],
})
export class ProductOfTheMonth implements OnInit {
  private productsService = inject(ProductsService);
  private destroyRef = inject(DestroyRef);
  readonly state = new LoadState<Product>();

  ngOnInit(): void {
    loadState(this.productsService.productOfTheMonth, this.state, this.destroyRef);
  }
}
