import { Injectable } from '@angular/core';
import { ExportRow } from '@app/core/models/export-row.model';

@Injectable({
  providedIn: 'root',
})
export class CsvGeneratorService {
  generate(rows: ExportRow[]): string {
    const headers = ['learner_first_name', 'leaner_last_name', 'email', 'course_code', 'course_name','session_date', 'quantity', 'unit_price',];
    const csvRows = rows.map(row => [
      row.leaner_first_name,
      row.leaner_last_name,
      row.email,
      row.course_code,
      row.course_name,
      row.session_date,
      row.quantity,
      row.unit_price,
      row.total_price,
    ]);
    return [headers, ...csvRows]
      .map(cols => cols.map(value => `"${String(value ?? '').replace(/"/g,'""')}"`).join(',')).join('\n');
  }

  downloadCsv(filename: string, content: string): void {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    setTimeout(() => {
      a.remove();
    }, 0);
  }
}
