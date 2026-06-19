import { ChangeDetectionStrategy, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MATERIAL_IMPORTS } from '@app/shared/material.imports';
import { RouterLinkActive, RouterLink } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { RbacService } from '@app/core/services/rbac.service';

@Component({
  selector: 'app-sidebar',
  imports: [MATERIAL_IMPORTS, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent implements OnInit {
  @ViewChild('sidenav') private readonly sidenav!: MatSidenav;
  readonly service = inject(RbacService);

  protected readonly routes: { path: string; label: string; icon: string }[] = [
    { path: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
    { path: '/complaints', label: 'Complaints', icon: 'assignment' },
    { path: '/prioritization/queue', label: 'Prioritization', icon: 'priority_high' },
    { path: '/integrations/sync', label: 'Synchronisation', icon: 'sync' },
    { path: '/audits', label: 'Audits', icon: 'gavel' },
    { path: '/notifications', label: 'Notifications', icon: 'notifications' },
    { path: '/administration', label: 'Administration', icon: 'admin_panel_settings' },
  ];

  toggle(): void {
    this.sidenav.toggle();
  }

  ngOnInit(): void {
    if (!this.service.canAccess(['administrateur', 'procureur'])) {
      this.routes.splice(0, 1);
    } else if (!this.service.canReviewPriority()) {
      this.routes.splice(2, 1);
    } else if (!this.service.canViewAudits()) {
      this.routes.splice(4, 1);
    } else if (!this.service.canManageUsers()) {
      this.routes.splice(6, 1);
    } else if (!this.service.canViewSynchronization()) {
      this.routes.splice(3, 1);
    }
  }
}
