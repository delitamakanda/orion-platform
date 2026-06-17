import { Service, signal } from '@angular/core';

@Service()
export class LoadingService {
  private count = signal<number>(0);
  readonly loading = signal<boolean>(false);

  show(): void {
    this.loading.set(true);
    this.count.update((c) => c + 1);
  }

  hide(): void {
    this.count.update((c) => Math.max(0, c - 1));
    if (this.count() === 0) {
      this.loading.set(false);
    }
  }
}
