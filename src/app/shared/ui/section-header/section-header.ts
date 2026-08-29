import { Component, input } from '@angular/core';

@Component({
  selector: 'app-section-header',
  imports: [],
  templateUrl: './section-header.html',
  styleUrl: './section-header.css',
})
export class SectionHeader {
  readonly label = input.required<string>();
  readonly title = input.required<string>();
  readonly description = input.required<string>();
  readonly align = input<'normal'>();
  readonly fallback = input<string>();
}
