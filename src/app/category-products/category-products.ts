import { Component, DestroyRef, inject, input, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { Product } from '../models/product-model';
import { ProductsService } from '../services/products';
import { ProductCard } from '../shared/ui/product-card/product-card';
import { SectionHeader } from '../shared/ui/section-header/section-header';
import { Skeleton } from '../shared/ui/skeleton/skeleton';

@Component({
  selector: 'app-category-products',
  imports: [RouterLink, ProductCard, SectionHeader, Skeleton],
  templateUrl: './category-products.html',
  styleUrl: './category-products.css',
})
export class CategoryProducts implements OnInit {
  slug = input.required<string>();

  private productsService = inject(ProductsService);
  private destroyRef = inject(DestroyRef);

  categoryTitle = signal<string | undefined>(undefined);
  products = signal<Product[] | undefined>(undefined);
  isEmptyProducts = signal(false);
  isLoading = signal(true);

  ngOnInit(): void {
    this.productsService
      .getCategory(this.slug())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (category) => this.categoryTitle.set(category?.title),
      });

    this.productsService
      .getProducts(this.slug())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (products) => {
          this.isLoading.set(false);
          if (products.length === 0) {
            this.isEmptyProducts.set(true);
            return;
          }

          this.products.set(products);
        },
      });
  }
}
