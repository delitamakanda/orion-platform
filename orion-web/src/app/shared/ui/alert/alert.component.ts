import { Component, ElementRef, input, OnInit, ViewChild } from '@angular/core';
import { NgClass } from '@angular/common';
import { MATERIAL_IMPORTS } from '@app/shared/material.imports';

@Component({
  selector: 'app-alert',
  imports: [NgClass, MATERIAL_IMPORTS],
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent implements OnInit {
  @ViewChild('alert') alert: ElementRef | undefined;
  readonly message = input.required<string>();
  readonly type = input<'info' | 'warning' | 'error'>('info');
  readonly autoClose = input<boolean>(true);

  dismiss(): void {
    if (this.alert) {
      this.alert.nativeElement.style.display = 'none';
    }
  }

  ngOnInit(): void {
    if (this.autoClose()) {
      setTimeout(() => this.dismiss(), 5000); // Auto-close after 5 seconds
    }
  }
}
