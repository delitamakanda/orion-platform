import { Component, inject, output, ViewChild } from '@angular/core';
import { MATERIAL_IMPORTS } from '@app/shared/material.imports';
import { Router, RouterLinkActive, RouterLink } from "@angular/router";
import { MatSidenav } from '@angular/material/sidenav';
import { siteConfig } from '@app/core/config/site.config';
import { AuthStore } from '@app/features/auth/data-access/auth.store';

@Component({
  selector: 'app-sidebar',
  imports: [
    MATERIAL_IMPORTS,
    RouterLink,
    RouterLinkActive,
],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'] ,
})
export class SidebarComponent {
  private readonly router = inject(Router);
  readonly store = inject(AuthStore);
  @ViewChild('sidenav') sidenav!: MatSidenav;
  protected title = siteConfig.title;

  routes: Record<string, string>[];

  toggleSidebar = output<void>();

  constructor() { 
    // list of routes for sidebar menu items
    this.routes = [
      {
        path: '/dashboard',
        label: 'Dashboard',
        icon: 'dashboard'
      },
      {
        path: '/complaints',
        label: 'Complaints',
        icon: 'assignment'
      },
      {
        path: '/prioritization/queue',
        label: 'Prioritization',
        icon: 'priority_high'
      },
      {
        path: '/integrations/sync',
        label: 'Synchronisation',
        icon: 'sync'
      },
      {
        path: '/audits',
        label: 'Audits',
        icon: 'gavel'
      },
      {
        path: '/notifications',
        label: 'Notifications',
        icon: 'notifications'
      }
    ];
  }

  toggleSidenav(): void {
    this.sidenav.toggle();
  }

  logout(): void {
    this.store.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }

}
