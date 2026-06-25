import { Component, output, signal } from '@angular/core';
import { ComplaintFilter } from '../../models/complaint-filters.model';
import { formatDateForFilter } from '@app/shared/utils/date.utils';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-complaint-filters',
  imports: [MatInputModule, MatSelectModule, MatCheckboxModule, MatDatepickerModule, MatButtonModule],
  templateUrl: './complaint-filters.html',
  styleUrls: ['./complaint-filters.css'],
})
export class ComplaintFilters {
  filterChange = output<Partial<ComplaintFilter>>();

  filterModel = signal<Partial<ComplaintFilter>>({
    reference: '',
    vulnerability_victim: true,
    incident_date_lte: '',
    incident_date_gte: '',
    created_at_lte: '',
    created_at_gte: '',
  });

  onChangeFilter(field: keyof ComplaintFilter, value: ComplaintFilter[keyof ComplaintFilter]) {
    this.filterModel.update((model) => ({ ...model, [field]: value }));
    this.filterChange.emit(this.filterModel());
  }

  onDateChange(
    field: 'incident_date_lte' | 'incident_date_gte' | 'created_at_lte' | 'created_at_gte',
    value: Date | null,
  ) {
    this.onChangeFilter(field, formatDateForFilter(value));
  }

  resetFilters() {
    this.filterModel.set({
      reference: '',
      vulnerability_victim: true,
      incident_date_lte: '',
      incident_date_gte: '',
      created_at_lte: '',
      created_at_gte: '',
    });
    this.filterChange.emit(this.filterModel());
  }
}
