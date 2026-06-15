import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';



@Injectable({
  providedIn: 'root',
})
export class ExcelGeneratorService {
  generateMoodle(summary: Record<string, any>): void {
    const wb: XLSX.WorkBook = XLSX.utils.book_new();

    const rows = summary["rows"].map((row: Record<string, any>) => ({
      firstName: row["leaner_first_name"],
      lastName: row["leaner_last_name"],
      email: row["email"],
      courseCode: row["course_code"],
      sessionDate: row["session_date"],
    }));

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(rows);
    ws['!cols'] = [
      {wch: 20},
      {wch: 20},
      {wch: 35},
      {wch: 20},
      {wch: 20},
    ]

    XLSX.utils.book_append_sheet(wb, ws, 'Export');
    XLSX.writeFile(wb, `${summary["reference"]}.xlsx`);
  }

  generateInvoice(summary: Record<string, any>): void {
    const wb: XLSX.WorkBook = XLSX.utils.book_new();

    const rows = summary["rows"].map((row: Record<string, any>) => ({
      'First Name': row["leaner_first_name"],
      'Last Name': row["leaner_last_name"],
      Email: row["email"],
      'Course Code': row["course_code"] ,
      'Course Name': row["course_name"],
      'Session Date': row["session_date"],
      Quantity: row["quantity"],
      'Unit Price': row["unit_price"],
      'Total Price': row["total_price"],
    }));

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(rows);
    ws['!cols'] = [
      { wch: 18 }, { wch: 18 }, { wch: 35 }, { wch: 30 }, { wch: 20 }, { wch: 18 }, { wch: 12 }, { wch: 14 }, { wch: 14 }
    ];

    XLSX.utils.book_append_sheet(wb, ws, 'Billing');
    XLSX.writeFile(wb, `${summary["reference"]}.xlsx`);
  }

  generateSummary(summary: Record<string, any>): void {
    const wb: XLSX.WorkBook = XLSX.utils.book_new();

    const data = [
      ['Client Name', summary["client_name"]],
      ['Client Code', summary["client_code"]],
      ['Period Start', summary["period_start"]],
      ['Period End', summary["period_end"]],
      ['Total', summary["total"]],
      ['Generated At', summary["generated_at"]],
      ['Reference', summary["reference"]],
    ];

    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(data);
    ws['!cols'] = [
      { wch: 24 }, { wch: 40 },
    ];
    XLSX.utils.book_append_sheet(wb, ws, 'Summary');
    XLSX.writeFile(wb, `${summary["reference"]}.xlsx`);
  }
}
