import { Component, input } from '@angular/core';

@Component({
  selector: 'app-section-header',
  imports: [],
  templateUrl: './section-header.html',
  styleUrl: './section-header.css',
})
export class SectionHeader {
  label = input.required<string>();
  title = input.required<string>();
  description = input.required<string>();
  align = input<'normal'>();
}
