import { Component, inject } from '@angular/core';
import { AuditStore } from '../../data-access/audit.store';

@Component({
  selector: 'app-audits-page',
  providers: [AuditStore],
  templateUrl: './audits-page.html',
  styleUrls: ['./audits-page.css'],
})
export class AuditsPage {
  readonly store = inject(AuditStore);
}
