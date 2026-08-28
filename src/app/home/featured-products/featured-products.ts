import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Product } from '../../models/product-model';
import { ProductsService } from '../../services/products';
import { ProductCard } from '../../shared/ui/product-card/product-card';
import { SectionHeader } from '../../shared/ui/section-header/section-header';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-featured-products',
  imports: [SectionHeader, ProductCard, RouterLink],
  templateUrl: './featured-products.html',
  styleUrl: './featured-products.css',
})
export class FeaturedProducts implements OnInit {
  private productsService = inject(ProductsService);
  private destroyRef = inject(DestroyRef);
  products = signal<Product[]>([]);

  ngOnInit(): void {
    this.productsService.featuredProducts.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (data) => this.products.set(data),
    });
  }
}
