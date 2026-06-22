import { Component, input } from '@angular/core';

@Component({
  selector: 'app-priority-factor-list',
  imports: [],
  templateUrl: './priority-factor-list.html',
  styleUrls: ['./priority-factor-list.css'],
})
export class PriorityFactorList {
  readonly factors = input<Record<string, string | boolean | number>>({});
}
