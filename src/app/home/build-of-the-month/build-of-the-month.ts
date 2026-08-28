import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { ProductsService } from '../../services/products';
import { Skeleton } from '../../shared/ui/skeleton/skeleton';
import { Product } from './../../models/product-model';

@Component({
  selector: 'app-build-of-the-month',
  templateUrl: './build-of-the-month.html',
  styleUrl: './build-of-the-month.css',
  imports: [RouterLink, Skeleton],
})
export class BuildOfTheMonth implements OnInit {
  private productsService = inject(ProductsService);
  private destroyRef = inject(DestroyRef);
  readonly product = signal<Product | undefined>(undefined);
  isLoading = signal(true);
  ngOnInit() {
    this.productsService.productOfTheMonth.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (product) => {
        this.product.set(product);
        this.isLoading.set(false);
      },
    });
  }
}
