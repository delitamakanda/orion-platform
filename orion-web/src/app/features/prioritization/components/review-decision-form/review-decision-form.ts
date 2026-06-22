import { Component, computed, inject, input, OnInit, output, signal } from '@angular/core';
import { MATERIAL_IMPORTS } from '@app/shared/material.imports';
import { PriorityLevel } from '../../models/priority-level.model';
import { FormsModule } from '@angular/forms';
import { AuthStore } from '@app/features/auth/data-access/auth.store';

@Component({
  selector: 'app-review-decision-form',
  imports: [MATERIAL_IMPORTS, FormsModule],
  templateUrl: './review-decision-form.html',
  styleUrls: ['./review-decision-form.css'],
})
export class ReviewDecisionForm implements OnInit {
  private readonly store = inject(AuthStore);
  readonly assessmentId = input<string>();
  readonly suggestedLevel = input<PriorityLevel>();
  readonly finalLevel = signal<PriorityLevel | null>(null);
  readonly suggestedScore = input<number | null>();
  readonly comment = signal<string>('');
  readonly levels: PriorityLevel[] = ['low', 'medium', 'high', 'critical'];
  protected readonly user = this.store.user;

  protected readonly reviewerId = computed(() => {
    const user = this.store.user();
    return user ? user.id : null;
  });

  readonly submitDecision = output<{
    assessment: string;
    previous_level: PriorityLevel;
    final_level: PriorityLevel;
    comment: string;
    reviewer: number;
  }>();

  readonly isOverride = computed(() => this.finalLevel() !== this.suggestedLevel());

  readonly isValid = computed(() => {
    const text = this.comment().trim();
    if (this.isOverride()) {
      return text.length >= 10;
    }
    return true;
  });

  ngOnInit(): void {
    this.finalLevel.set(this.suggestedLevel()!);
  }

  submit() {
    if (!this.isValid()) {
      return;
    }
    this.submitDecision.emit({
      assessment: this.assessmentId()!,
      previous_level: this.suggestedLevel()!,
      final_level: this.finalLevel()!,
      comment: this.comment().trim(),
      reviewer: this.reviewerId()!,
    });
  }
}
