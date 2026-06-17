import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { MATERIAL_IMPORTS } from '@app/shared/material.imports';
import { colorFromName } from '@app/shared/utils/palette.utils';

@Component({
  selector: 'app-avatar',
  imports: [MATERIAL_IMPORTS],
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'size()' },
})
export class AvatarComponent {
  readonly name = input.required<string>();
  readonly imageUrl = input<string | null>(null);
  readonly size = input<'sm' | 'md' | 'lg'>('md');

  protected readonly initials = computed(() =>
    this.name()
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((n) => n.charAt(0).toUpperCase())
      .join(''),
  );

  protected readonly color = computed(() => colorFromName(this.name()));
}
