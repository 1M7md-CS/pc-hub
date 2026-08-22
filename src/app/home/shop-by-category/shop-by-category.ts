import { Component, inject, OnInit, signal } from '@angular/core';
import { SectionHeader } from '../../section-header/section-header';
import { Category } from '../../shared/models/category.model';
import { CategoryService } from '../../shared/services/category.service';

@Component({
  selector: 'app-shop-by-category',
  imports: [SectionHeader],
  templateUrl: './shop-by-category.html',
  styleUrl: './shop-by-category.css',
})
export class ShopByCategory implements OnInit {
  private readonly categoryService = inject(CategoryService);

  readonly categories = signal<Category[]>([]);

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe({
      next: (categories) => this.categories.set(categories),
    });
  }
}
