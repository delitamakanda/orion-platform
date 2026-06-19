import { ResolveFn } from '@angular/router';
import { Complaint } from '../models/complaint.model';
import { inject } from '@angular/core';
import { ComplaintStore } from '../data-access/complaint.store';

export const complaintResolverResolver: ResolveFn<Complaint> = (route) => {
  const store = inject(ComplaintStore);
  return store.findComplaintById(route.params['id']);
};
