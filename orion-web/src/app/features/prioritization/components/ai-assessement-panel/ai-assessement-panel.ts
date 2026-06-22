import { Component, input } from '@angular/core';
import { PriorityAssessment } from '../../models/ai-analysis.model';
import { RouterLink } from '@angular/router';
import { CommonModule, DatePipe, TitleCasePipe } from '@angular/common';
import { MATERIAL_IMPORTS } from '@app/shared/material.imports';

@Component({
  selector: 'app-ai-assessement-panel',
  imports: [CommonModule, RouterLink, DatePipe, MATERIAL_IMPORTS, TitleCasePipe],
  templateUrl: './ai-assessement-panel.html',
  styleUrls: ['./ai-assessement-panel.css'],
})
export class AiAssessementPanel {
  readonly assessment = input<PriorityAssessment>();
}
