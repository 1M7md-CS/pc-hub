import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
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
    forkJoin({
      categories: this.productsService.categories,
      pre_built_pc: this.productsService.getProducts('pre-built-pcs'),
      gpu: this.productsService.getProducts('gpu'),
      cpu: this.productsService.getProducts('processors'),
      ram: this.productsService.getProducts('ram'),
      storage: this.productsService.getProducts('storage'),
      psu: this.productsService.getProducts('psu'),
      cases: this.productsService.getProducts('cases'),
      cooling: this.productsService.getProducts('cooling'),
      motherboards: this.productsService.getProducts('motherboards'),
      accessories: this.productsService.getProducts('accessories'),
    })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: ({ categories, ...products }) => {
          const counts: Record<string, number> = {
            'pre-built-pcs': products.pre_built_pc.length,
            gpu: products.gpu.length,
            processors: products.cpu.length,
            ram: products.ram.length,
            storage: products.storage.length,
            psu: products.psu.length,
            cases: products.cases.length,
            cooling: products.cooling.length,
            motherboards: products.motherboards.length,
            accessories: products.accessories.length,
          };
          this.categories.set(
            categories.map((category) => {
              const slug = category.link.split('/').pop() ?? '';
              return { ...category, count: counts[slug] ?? 0 };
            }),
          );
          this.isLoading.set(false);
        },
      });
  }
}
