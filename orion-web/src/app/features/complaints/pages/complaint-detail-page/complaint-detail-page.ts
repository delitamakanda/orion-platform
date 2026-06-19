import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComplaintStore } from '../../data-access/complaint.store';
import { map } from 'rxjs';
import { MATERIAL_IMPORTS } from '@app/shared/material.imports';
import { DatePipe } from '@angular/common';
import { PrioritizationStore } from '@app/features/prioritization/data-access/prioritization.store';

@Component({
  selector: 'app-complaint-detail-page',
  imports: [MATERIAL_IMPORTS, DatePipe],
  templateUrl: './complaint-detail-page.html',
  styleUrls: ['./complaint-detail-page.css'],
})
export class ComplaintDetailPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  readonly store = inject(ComplaintStore);
  readonly storePrioritization = inject(PrioritizationStore);

  ngOnInit(): void {
    this.route.data.pipe(map((data) => data['complaintData'])).subscribe((complaint) => {
      this.store.selectComplaint(complaint);
    });
  }

  analyzeComplaint(): void {
    const selectedComplaint = this.store.selectedComplaint();
    if (selectedComplaint) {
      this.storePrioritization.createAssessment(selectedComplaint.id).subscribe({
        next: (assessment) => {
          console.log('Assessment created:', assessment);
        },
        error: (error) => {
          console.error('Error creating assessment:', error);
        },
      });
    }
  }
}
