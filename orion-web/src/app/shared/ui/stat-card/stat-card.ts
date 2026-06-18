import { Component, input } from '@angular/core';
import { MATERIAL_IMPORTS } from '@app/shared/material.imports';

@Component({
  selector: 'app-stat-card',
  imports: [MATERIAL_IMPORTS],
  templateUrl: './stat-card.html',
  styleUrls: ['./stat-card.css'],
})
export class StatCard {
  readonly title = input.required<string | undefined>();
  readonly value = input.required<string | number | undefined | null>();
}
