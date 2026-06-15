import { Component, inject } from '@angular/core';
import { ComplaintStore } from '../../data-access/complaint.store';
import { MATERIAL_IMPORTS } from '@app/shared/material.imports';

@Component({
  selector: 'app-complaint-list-page',
  imports: [MATERIAL_IMPORTS],
  providers: [ComplaintStore],
  templateUrl: './complaint-list-page.html',
  styleUrls: ['./complaint-list-page.css'],
})
export class ComplaintListPage {
  readonly store = inject(ComplaintStore);
}
