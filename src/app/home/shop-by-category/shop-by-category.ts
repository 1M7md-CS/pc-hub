import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { Category } from '../../models/product-model';
import { ProductsService } from '../../services/products';
import { SectionHeader } from '../../shared/ui/section-header/section-header';
import { Skeleton } from '../../shared/ui/skeleton/skeleton';
import { Icon } from '../../shared/ui/icon/icon';

@Component({
  selector: 'app-shop-by-category',
  imports: [SectionHeader, RouterLink, Skeleton, Icon],
  templateUrl: './shop-by-category.html',
  styleUrl: './shop-by-category.css',
})
export class ShopByCategory implements OnInit {
  private readonly productsService = inject(ProductsService);
  private destroyRef = inject(DestroyRef);
  readonly categories = signal<Category[]>([]);
  isLoading = signal(true);

  ngOnInit(): void {
    this.productsService.categories.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (categories) => {
        this.categories.set(categories);
        this.isLoading.set(false);
      },
    });
  }
}
