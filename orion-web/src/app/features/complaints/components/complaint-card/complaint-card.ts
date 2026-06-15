import { Component, input } from '@angular/core';
import { Complaint } from '../../models/complaint.model';

@Component({
  selector: 'app-complaint-card',
  imports: [],
  templateUrl: './complaint-card.html',
  styleUrls: ['./complaint-card.css'],
})
export class ComplaintCard {
  complaint = input.required<Complaint>();
}
