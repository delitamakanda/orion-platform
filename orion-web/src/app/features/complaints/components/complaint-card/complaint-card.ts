import { Component, input } from '@angular/core';
import { Complaint } from '../../models/complaint.model';
import { MATERIAL_IMPORTS } from '@app/shared/material.imports';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-complaint-card',
  imports: [MATERIAL_IMPORTS, DatePipe],
  templateUrl: './complaint-card.html',
  styleUrls: ['./complaint-card.css'],
})
export class ComplaintCard {
  complaint = input.required<Complaint>();

  onSelectComplaint(): void {
    // Logic to handle complaint selection, e.g., navigate to a detail page or emit an event
    console.log('Selected complaint:', this.complaint());
  }
}
