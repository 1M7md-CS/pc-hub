import { HttpClient } from '@angular/common/http';
import { Component, DestroyRef, inject, input, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { RouterLink } from "@angular/router";
import { SectionHeader } from "../shared/ui/section-header/section-header";

@Component({
  selector: 'app-page',
  imports: [RouterLink, SectionHeader],
  templateUrl: './page.html',
  styleUrl: './page.css',
})
export class Page implements OnInit {
  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);
  readonly slug = input.required<string>();
  page = signal<PageContent | undefined>(undefined);

  ngOnInit(): void {
    this.httpClient
      .get<Record<string, PageContent>>('data/pages.json')
      .pipe(
        map((pages) => pages[this.slug()]),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: (page) => this.page.set(page),
      });
  }
}
