import { Component, DestroyRef, inject, input, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProductsService } from '../../../services/products';

@Component({
  selector: 'app-icon',
  imports: [],
  templateUrl: './icon.html',
  styleUrl: './icon.css',
})
export class Icon implements OnInit {
  private readonly productsService = inject(ProductsService);
  private readonly destroyRef = inject(DestroyRef);

  readonly name = input.required<string>();
  readonly fill = input<'none' | 'currentColor'>('none');
  readonly size = input<string | undefined>(undefined);
  readonly strokeWidth = input<string>('2');

  readonly paths = signal<string[]>([]);

  ngOnInit(): void {
    this.productsService
      .geticon()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((icons) => {
        this.paths.set(icons.find((i) => i.name === this.name())?.paths ?? []);
      });
  }
}
