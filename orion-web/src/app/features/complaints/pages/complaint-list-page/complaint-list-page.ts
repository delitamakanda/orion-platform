import { Component, inject } from '@angular/core';
import { ComplaintStore } from '../../data-acess/complaint.store';
import { MaterialModules } from '@app/shared/material.module';

@Component({
  selector: 'app-complaint-list-page',
  imports: [MaterialModules],
  providers: [ComplaintStore],
  templateUrl: './complaint-list-page.html',
  styleUrls: ['./complaint-list-page.css'],
})
export class ComplaintListPage {
  readonly store = inject(ComplaintStore);
}
