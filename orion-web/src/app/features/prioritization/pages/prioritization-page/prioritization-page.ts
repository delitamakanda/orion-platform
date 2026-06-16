import { Component, inject } from '@angular/core';
import { PrioritizationStore } from '../../data-access/prioritization.store';

@Component({
  selector: 'app-prioritization-page',
  imports: [],
  providers: [PrioritizationStore],
  templateUrl: './prioritization-page.html',
  styleUrls: ['./prioritization-page.css'],
})
export class PrioritizationPage {
  readonly store = inject(PrioritizationStore);

  
}
