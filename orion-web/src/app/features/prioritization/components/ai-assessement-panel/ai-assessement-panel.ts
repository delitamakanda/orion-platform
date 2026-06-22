import { Component, input } from '@angular/core';
import { PriorityAssessment } from '../../models/ai-analysis.model';
import { RouterLink } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { MATERIAL_IMPORTS } from '@app/shared/material.imports';
import { SHARED_UI_COMPONENTS } from '@app/shared/ui/components.module';

@Component({
  selector: 'app-ai-assessement-panel',
  imports: [CommonModule, RouterLink, DatePipe, MATERIAL_IMPORTS, SHARED_UI_COMPONENTS],
  templateUrl: './ai-assessement-panel.html',
  styleUrls: ['./ai-assessement-panel.css'],
})
export class AiAssessementPanel {
  readonly assessment = input<PriorityAssessment>();
}
