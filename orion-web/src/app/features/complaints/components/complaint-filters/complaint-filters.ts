import { Component, output, signal } from '@angular/core';
import { ComplaintFilter } from '../../models/complaint-filters.model';
import { MATERIAL_IMPORTS } from '@app/shared/material.imports';
import { formatDateForFilter } from '@app/shared/utils/date.utils';

@Component({
  selector: 'app-complaint-filters',
  imports: [MATERIAL_IMPORTS],
  templateUrl: './complaint-filters.html',
  styleUrls: ['./complaint-filters.css'],
})
export class ComplaintFilters {
  filterChange = output<Partial<ComplaintFilter>>();

  filterModel = signal<Partial<ComplaintFilter>>({
    reference: '',
    vulnerability_victim: false,
    incident_date_lte: '',
    incident_date_gte: '',
    created_at_lte: '',
    created_at_gte: '',
  });

  onChangeFilter(field: keyof ComplaintFilter, value: ComplaintFilter[keyof ComplaintFilter]) {
    this.filterModel.update(model => ({ ...model, [field]: value }));
    this.filterChange.emit(this.filterModel());
  }

  onDateChange(field: 'incident_date_lte' | 'incident_date_gte' | 'created_at_lte' | 'created_at_gte', value: Date | null) {
    this.onChangeFilter(field, formatDateForFilter(value));
  }

  resetFilters() {
    this.filterModel.set({
      reference: '',
      vulnerability_victim: undefined,
      incident_date_lte: '',
      incident_date_gte: '',
      created_at_lte: '',
      created_at_gte: '',
    });
    this.filterChange.emit(this.filterModel());
  }
}
