import { Component, ElementRef, input, OnDestroy, OnInit, signal, viewChild } from '@angular/core';
import { MATERIAL_IMPORTS } from '@app/shared/material.imports';

@Component({
  selector: 'app-alert',
  imports: [MATERIAL_IMPORTS],
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent implements OnInit, OnDestroy {
  private timeoutId: ReturnType<typeof setTimeout> | null = null;
  readonly alert = viewChild(signal<ElementRef | null>(null));
  readonly message = input.required<string>();
  readonly type = input<'info' | 'warning' | 'error'>('info');
  readonly autoClose = input<boolean>(true);

  dismiss(): void {
    if (this.alert()) {
      this.alert().nativeElement.style.display = 'none';
    }
  }

  ngOnInit(): void {
    if (this.autoClose()) {
      this.timeoutId = setTimeout(() => this.dismiss(), 5000); // Auto-close after 5 seconds
    }
  }

  ngOnDestroy(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }
}
