import { Component, output, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AssessmentFilter } from '../../models/assessment-filter.model';

@Component({
  selector: 'app-prioritization-filter',
  imports: [MatSelectModule, MatOptionModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './prioritization-filter.html',
  styleUrls: ['./prioritization-filter.css'],
})
export class PrioritizationFilter {
  filterModel = signal<Partial<AssessmentFilter>>({
    status: '',
    urgency: '',
    level: '',
    location: '',
  });

  readonly filterChange = output<Partial<AssessmentFilter>>();

  onChangeFilter(field: keyof AssessmentFilter, value: AssessmentFilter[keyof AssessmentFilter]) {
    const updatedFilter = { ...this.filterModel(), [field]: value };
    this.filterChange.emit(updatedFilter);
  }

  resetFilters() {
    const resetFilter: Partial<AssessmentFilter> = {
      status: '',
      urgency: '',
      level: '',
      location: '',
    };
    this.filterChange.emit(resetFilter);
  }
}
