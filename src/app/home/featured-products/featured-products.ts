import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { loadState, LoadState } from './../../shared/async-state';

import { RouterLink } from '@angular/router';
import { Product } from '../../models/product-model';
import { ProductsService } from '../../services/products';
import { ProductCard } from '../../shared/ui/product-card/product-card';
import { ProductSkeleton } from '../../shared/ui/product-skeleton/product-skeleton';
import { SectionHeader } from '../../shared/ui/section-header/section-header';
import { StateCardError } from "../../shared/ui/state-card-error/state-card-error";

@Component({
  selector: 'app-featured-products',
  imports: [SectionHeader, ProductCard, RouterLink, ProductSkeleton, StateCardError],
  templateUrl: './featured-products.html',
  styleUrl: './featured-products.css',
})
export class FeaturedProducts implements OnInit {
  private productsService = inject(ProductsService);
  private destroyRef = inject(DestroyRef);
  readonly state = new LoadState<Product[]>();

  ngOnInit(): void {
    loadState(this.productsService.featuredProducts, this.state, this.destroyRef);
  }
}
