import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { MATERIAL_IMPORTS } from '@app/shared/material.imports';
import { RouterLinkActive, RouterLink } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-sidebar',
  imports: [MATERIAL_IMPORTS, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  @ViewChild('sidenav') private readonly sidenav!: MatSidenav;

  protected readonly routes: { path: string; label: string; icon: string }[] = [
    { path: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
    { path: '/complaints', label: 'Complaints', icon: 'assignment' },
    { path: '/prioritization/queue', label: 'Prioritization', icon: 'priority_high' },
    { path: '/integrations/sync', label: 'Synchronisation', icon: 'sync' },
    { path: '/audits', label: 'Audits', icon: 'gavel' },
    { path: '/notifications', label: 'Notifications', icon: 'notifications' },
  ];

  toggle(): void {
    this.sidenav.toggle();
  }
}
