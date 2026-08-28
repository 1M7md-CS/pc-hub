import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Category } from '../../models/product-model';
import { ProductsService } from '../../services/products';
import { SectionHeader } from '../../shared/ui/section-header/section-header';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-shop-by-category',
  imports: [SectionHeader, RouterLink],
  templateUrl: './shop-by-category.html',
  styleUrl: './shop-by-category.css',
})
export class ShopByCategory implements OnInit {
  private readonly productsService = inject(ProductsService);
  private destroyRef = inject(DestroyRef);
  readonly categories = signal<Category[]>([]);

  ngOnInit(): void {
    this.productsService.categories.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (categories) => this.categories.set(categories),
    });
  }
}
