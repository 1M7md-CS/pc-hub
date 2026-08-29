import { HttpClient } from '@angular/common/http';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Testimonial } from '../../models/testimonial-model';
import { SectionHeader } from '../../shared/ui/section-header/section-header';
import { Skeleton } from '../../shared/ui/skeleton/skeleton';
import { Icon } from '../../shared/ui/icon/icon';

@Component({
  selector: 'app-testimonials',
  imports: [SectionHeader, Skeleton, Icon],
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.css',
})
export class Testimonials implements OnInit {
  readonly stars = [0, 1, 2, 3, 4];
  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);
  testimonials = signal<Testimonial[]>([]);
  isLoading = signal(true);

  ngOnInit(): void {
    this.httpClient
      .get<Testimonial[]>('data/testimonials.json')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (testimonials) => {
          this.testimonials.set(testimonials);
          this.isLoading.set(false);
        },
      });
  }
}
