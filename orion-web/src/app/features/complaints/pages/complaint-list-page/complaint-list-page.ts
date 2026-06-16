import { Component, inject } from '@angular/core';
import { ComplaintStore } from '../../data-access/complaint.store';
import { MATERIAL_IMPORTS } from '@app/shared/material.imports';
import { ComplaintFilters } from '../../components/complaint-filters/complaint-filters';
import { ComplaintCard } from '../../components/complaint-card/complaint-card';
import { ComplaintFilter } from '../../models/complaint-filters.model';

@Component({
  selector: 'app-complaint-list-page',
  imports: [MATERIAL_IMPORTS, ComplaintCard, ComplaintFilters],
  providers: [ComplaintStore],
  templateUrl: './complaint-list-page.html',
  styleUrls: ['./complaint-list-page.css'],
})
export class ComplaintListPage {
  readonly store = inject(ComplaintStore);

  updateFilters(filter: Partial<ComplaintFilter>) {
    this.store.updateFilters(filter);
  }
}
