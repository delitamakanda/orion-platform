import { ResolveFn } from '@angular/router';
import { PrioritizationStore } from '../data-access/prioritization.store';
import { inject } from '@angular/core';
import { PriorityAssessment } from '../models/ai-analysis.model';

export const prioritizationResolver: ResolveFn<PriorityAssessment> = (route) => {
  const store = inject(PrioritizationStore);
  return store.assessmentByComplaintId(Number(route.paramMap.get('complaintId')));
};
