import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { Category } from '../../models/product-model';
import { ProductsService } from '../../services/products';
import { SectionHeader } from '../../shared/ui/section-header/section-header';

@Component({
  selector: 'app-shop-by-category',
  imports: [SectionHeader],
  templateUrl: './shop-by-category.html',
  styleUrl: './shop-by-category.css',
})
export class ShopByCategory implements OnInit {
  private readonly productsService = inject(ProductsService);
  private destroyRef = inject(DestroyRef);
  readonly categories = signal<Category[]>([]);

  ngOnInit(): void {
    const subscription = this.productsService.categories.subscribe({
      next: (categories) => this.categories.set(categories),
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
