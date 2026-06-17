import { Component, input } from '@angular/core';
import { MatDialogClose } from '@angular/material/dialog';

@Component({
  selector: 'app-page-header',
  imports: [MatDialogClose],
  templateUrl: './page-header.html',
  styleUrls: ['./page-header.css'],
})
export class PageHeader {
  readonly title = input.required<string>();
  readonly subtitle = input<string>();
}
