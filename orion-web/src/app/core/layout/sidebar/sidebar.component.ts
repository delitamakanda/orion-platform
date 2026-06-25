import { ChangeDetectionStrategy, Component, inject, ViewChild, computed } from '@angular/core';
import { RouterLinkActive, RouterLink } from '@angular/router';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { RbacService } from '@app/core/services/rbac.service';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatBadgeModule } from '@angular/material/badge';
import { NotificationStore } from '@app/features/notifications/data-access/notification.store';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-sidebar',
  imports: [
    RouterLink,
    RouterLinkActive,
    MatBadgeModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatInputModule,
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  @ViewChild('sidenav') private readonly sidenav!: MatSidenav;
  readonly service = inject(RbacService);
  readonly store = inject(NotificationStore);

  protected readonly routes: { path: string; label: string; icon: string }[] = [
    { path: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
    { path: '/complaints', label: 'Complaints', icon: 'assignment' },
    { path: '/prioritization/queue', label: 'Prioritization', icon: 'priority_high' },
    { path: '/integrations/sync', label: 'Synchronisation', icon: 'sync' },
    { path: '/audits', label: 'Audits', icon: 'gavel' },
    { path: '/notifications', label: 'Notifications', icon: 'notifications' },
    { path: '/administration', label: 'Administration', icon: 'admin_panel_settings' },
  ];

  protected readonly routesToShow = computed(() => {
    const filteredRoutes = [...this.routes];
    if (!this.service.canAccess(['administrateur', 'procureur'])) {
      filteredRoutes.splice(0, 1);
    } else if (!this.service.canReviewPriority()) {
      filteredRoutes.splice(2, 1);
    } else if (!this.service.canViewAudits()) {
      filteredRoutes.splice(4, 1);
    } else if (!this.service.canManageUsers()) {
      filteredRoutes.splice(6, 1);
    } else if (!this.service.canViewSynchronization()) {
      filteredRoutes.splice(3, 1);
    }
    return filteredRoutes;
  });

  toggle(): void {
    this.sidenav.toggle();
  }
}
