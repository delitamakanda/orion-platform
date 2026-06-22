import { Component, inject } from '@angular/core';
import { PrioritizationStore } from '../../data-access/prioritization.store';
import { AiAssessementPanel } from '../../components/ai-assessement-panel/ai-assessement-panel';

@Component({
  selector: 'app-prioritization-page',
  imports: [AiAssessementPanel],
  providers: [PrioritizationStore],
  templateUrl: './prioritization-page.html',
  styleUrls: ['./prioritization-page.css'],
})
export class PrioritizationPage {
  readonly store = inject(PrioritizationStore);
}
