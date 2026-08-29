import { Component, computed, inject, input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductsService } from '../../../services/products';

@Component({
  selector: 'app-icon',
  imports: [],
  templateUrl: './icon.html',
  styleUrl: './icon.css',
})
export class Icon {
  private readonly productsService = inject(ProductsService);

  readonly name = input.required<string>();
  readonly fill = input<'none' | 'currentColor'>('none');
  readonly size = input<string | undefined>(undefined);

  readonly icons = toSignal(this.productsService.geticon(), { initialValue: [] });

  readonly iconPaths = computed(
    () => this.icons().find((icon) => icon.name === this.name())?.paths ?? [],
  );
}
