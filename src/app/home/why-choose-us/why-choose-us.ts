import { HttpClient } from '@angular/common/http';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Features } from '../../models/feature-model';

@Component({
  selector: 'app-why-choose-us',
  imports: [],
  templateUrl: './why-choose-us.html',
  styleUrl: './why-choose-us.css',
})
export class WhyChooseUs implements OnInit {
  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);
  features = signal<Features[]>([]);

  ngOnInit() {
    this.httpClient
      .get<Features[]>('data/features.json')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (features) => this.features.set(features),
      });
  }
}
