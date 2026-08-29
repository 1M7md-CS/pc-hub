import { Component, DestroyRef, inject, input, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../models/product-model';
import { ProductsService } from '../services/products';
import { LoadState, loadState } from '../shared/async-state';
import { ProductCard } from '../shared/ui/product-card/product-card';
import { ProductSkeleton } from '../shared/ui/product-skeleton/product-skeleton';
import { SectionHeader } from '../shared/ui/section-header/section-header';
import { StateCardError } from '../shared/ui/state-card/state-card';

@Component({
  selector: 'app-category-products',
  imports: [RouterLink, ProductCard, SectionHeader, ProductSkeleton, StateCardError],
  templateUrl: './category-products.html',
  styleUrl: './category-products.css',
})
export class CategoryProducts implements OnInit {
  slug = input.required<string>();

  private productsService = inject(ProductsService);
  private destroyRef = inject(DestroyRef);

  readonly state = new LoadState<Product[]>();
  readonly categoryTitle = signal<string | undefined>(undefined);

  ngOnInit(): void {
    loadState(this.productsService.getProducts(this.slug()), this.state, this.destroyRef);

    this.productsService.getCategory(this.slug()).subscribe({
      next: (category) => this.categoryTitle.set(category?.title),
    });
  }
}
