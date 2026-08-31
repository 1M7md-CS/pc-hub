import { Component, computed, input } from '@angular/core';
import { icons } from '../../../models/icons-model';

@Component({
  selector: 'app-icon',
  imports: [],
  templateUrl: './icon.html',
  styleUrl: './icon.css',
})
export class Icon {
  readonly name = input.required<string>();
  readonly fill = input<'none' | 'currentColor'>('none');
  readonly size = input<string | undefined>(undefined);
  readonly strokeWidth = input<string>('2');

  readonly paths = computed(() => icons.find((icon) => icon.name === this.name())?.paths ?? []);
}
