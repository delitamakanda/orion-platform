import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { MATERIAL_IMPORTS } from '@app/shared/material.imports';

export type StatVariant = 'default' | 'critical' | 'high' | 'medium' | 'low' | 'success' | 'info';

const VARIANT_ICON_CLASSES: Record<StatVariant, string> = {
  default: 'bg-slate-100 text-slate-500',
  critical: 'bg-red-100 text-red-600',
  high: 'bg-orange-100 text-orange-600',
  medium: 'bg-amber-100 text-amber-600',
  low: 'bg-green-100 text-green-600',
  success: 'bg-emerald-100 text-emerald-600',
  info: 'bg-sky-100 text-sky-600',
};

@Component({
  selector: 'app-stat-card',
  imports: [MATERIAL_IMPORTS],
  templateUrl: './stat-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatCard {
  readonly title = input.required<string>();
  readonly value = input.required<string | number | undefined | null>();
  readonly icon = input<string>('analytics');
  readonly variant = input<StatVariant>('default');

  readonly iconWrapperClass = computed(
    () => `flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${VARIANT_ICON_CLASSES[this.variant()]}`,
  );
}
