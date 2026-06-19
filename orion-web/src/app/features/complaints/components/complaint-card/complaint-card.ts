import { Component, inject, input } from '@angular/core';
import { Complaint } from '../../models/complaint.model';
import { MATERIAL_IMPORTS } from '@app/shared/material.imports';
import { DatePipe } from '@angular/common';
import { ComplaintStore } from '../../data-access/complaint.store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-complaint-card',
  imports: [MATERIAL_IMPORTS, DatePipe],
  templateUrl: './complaint-card.html',
  styleUrls: ['./complaint-card.css'],
})
export class ComplaintCard {
  readonly complaint = input.required<Complaint>();
  readonly store = inject(ComplaintStore);
  private readonly router = inject(Router);

  onSelectComplaint(): void {
    this.store.selectComplaint(this.complaint());
    this.router.navigate(['/complaints', this.complaint().id]);
  }
}
