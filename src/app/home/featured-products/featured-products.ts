import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { Product } from '../../models/product-model';
import { ProductsService } from '../../services/products';
import { ProductCard } from '../../shared/ui/product-card/product-card';
import { SectionHeader } from '../../shared/ui/section-header/section-header';
import { Skeleton } from '../../shared/ui/skeleton/skeleton';

@Component({
  selector: 'app-featured-products',
  imports: [SectionHeader, ProductCard, RouterLink, Skeleton],
  templateUrl: './featured-products.html',
  styleUrl: './featured-products.css',
})
export class FeaturedProducts implements OnInit {
  private productsService = inject(ProductsService);
  private destroyRef = inject(DestroyRef);
  products = signal<Product[]>([]);
  isLoading = signal(true);

  ngOnInit(): void {
    this.productsService.featuredProducts.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (data) => {
        this.products.set(data);
        this.isLoading.set(false);
      },
    });
  }
}
