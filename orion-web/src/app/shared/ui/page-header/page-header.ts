import { Component, input } from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.html',
  styleUrls: ['./page-header.css'],
})
export class PageHeader {
  readonly title = input.required<string>();
  readonly subtitle = input<string>();
}
