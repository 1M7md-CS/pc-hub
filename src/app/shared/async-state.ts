import { DestroyRef, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';

export class LoadState<T> {
  readonly isLoading = signal<boolean>(true);
  readonly isEmpty = signal<boolean>(false);
  readonly data = signal<T | undefined>(undefined);
  readonly error = signal<string | null>(null);
}

export function loadState<T>(source: Observable<T>, state: LoadState<T>, destroyRef: DestroyRef) {
  source.pipe(takeUntilDestroyed(destroyRef)).subscribe({
    next: (data) => {
      state.isLoading.set(false);
      if (Array.isArray(data) && data.length === 0) state.isEmpty.set(true);
      state.data.set(data);
    },
    error: (error) => {
      state.isLoading.set(false);
      state.isEmpty.set(false);
      state.error.set(error);
    },
  });
}
