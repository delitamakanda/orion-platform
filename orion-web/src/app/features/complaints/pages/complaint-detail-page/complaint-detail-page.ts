import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComplaintStore } from '../../data-access/complaint.store';
import { map } from 'rxjs';
import { MATERIAL_IMPORTS } from '@app/shared/material.imports';
import { DatePipe } from '@angular/common';
import { PrioritizationStore } from '@app/features/prioritization/data-access/prioritization.store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SnackbarService } from '@app/core/services/snackbar.service';

@Component({
  selector: 'app-complaint-detail-page',
  imports: [MATERIAL_IMPORTS, DatePipe],
  templateUrl: './complaint-detail-page.html',
  styleUrls: ['./complaint-detail-page.css'],
})
export class ComplaintDetailPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);
  private readonly service = inject(SnackbarService);
  readonly store = inject(ComplaintStore);
  readonly storePrioritization = inject(PrioritizationStore);

  ngOnInit(): void {
    this.route.data
      .pipe(
        map((data) => data['complaintData']),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((complaint) => {
        this.store.selectComplaint(complaint);
      });
  }

  analyzeComplaint(): void {
    const selectedComplaint = this.store.selectedComplaint();
    if (selectedComplaint) {
      this.storePrioritization
        .createAssessment(selectedComplaint.id)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (assessment) => {
            this.service.showSuccessSnackbar(`Assessment created successfully with ID: ${assessment}`);
          },
          error: (error) => {
            this.service.showErrorSnackbar(`Failed to create assessment: ${error.message}`);
          },
        });
    }
  }
}
