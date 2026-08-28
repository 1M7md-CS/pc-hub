import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProductsService } from '../../services/products';
import { Product } from './../../models/product-model';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-build-of-the-month',
  templateUrl: './build-of-the-month.html',
  styleUrl: './build-of-the-month.css',
  imports: [RouterLink],
})
export class BuildOfTheMonth implements OnInit {
  private productsService = inject(ProductsService);
  private destroyRef = inject(DestroyRef);
  readonly product = signal<Product | undefined>(undefined);
  ngOnInit() {
    this.productsService.productOfTheMonth.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (product) => this.product.set(product),
    });
  }
}
