import { Injectable } from '@angular/core';
import * as jspdf from 'jspdf';

@Injectable({
  providedIn: 'root',
})
export class PdfGeneratorService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  generate(summary: Record<string, any>): void {
    const doc = new jspdf.jsPDF();

    let y = 20;
    doc.setFontSize(16);
    doc.text('Billing', 14, y);

    y += 10;
    doc.setFontSize(11);
    doc.text(`Client : ${summary['client_name']} (${summary['client_code']})`, 14, y);

    y += 8;
    doc.text(`Period: ${summary['period_start']} - ${summary['period_end']}`, 14, y);

    y += 8;
    doc.text(`Référence: ${summary['reference']}`, 14, y);

    y += 12;
    doc.text('Invoice Summary', 14, y);

    y += 8;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    summary['rows'].forEach((row: any, index: number) => {
      const line = `${index + 1}. ${row['leaner_first_name']} ${row['leaner_last_name']} - ${row['course_code']} - Qty ${row['quantity']} - ${row['total_price'].toFixed(2)}`;
      doc.text(line, 14, y);
      y += 7;

      if (y > 280) {
        doc.addPage();
        y = 20;
      }
    });

    y += 8;
    doc.setFontSize(11);
    doc.text(`Total: ${summary['total'].toFixed(2)}`, 14, y);

    doc.save(`${summary['reference']}.pdf`);
  }
}
