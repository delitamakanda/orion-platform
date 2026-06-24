import { DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';
import { Component, computed } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  providers: [
    {
      provide: DATE_PIPE_DEFAULT_OPTIONS,
      useValue: { dateFormat: 'shortDate' },
    },
  ],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  readonly currentYear = computed(() => new Date().getFullYear());
}
