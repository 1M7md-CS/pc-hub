import { HttpClient } from '@angular/common/http';
import { Component, DestroyRef, inject, input, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { PageContent } from '../models/page-model';
import { Icon } from '../shared/ui/icon/icon';
import { SectionHeader } from '../shared/ui/section-header/section-header';
import { Skeleton } from '../shared/ui/skeleton/skeleton';

@Component({
  selector: 'app-page',
  imports: [RouterLink, SectionHeader, Skeleton, Icon],
  templateUrl: './page.html',
  styleUrl: './page.css',
})
export class Page implements OnInit {
  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);
  readonly slug = input.required<string>();
  page = signal<PageContent | undefined>(undefined);
  isLoading = signal(true);

  ngOnInit(): void {
    this.httpClient
      .get<Record<string, PageContent>>('data/pages.json')
      .pipe(
        map((pages) => pages[this.slug()]),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: (page) => {
          this.page.set(page);
          this.isLoading.set(false);
        },
      });
  }
}
