import { Component, inject, output, ViewChild } from '@angular/core';
import MaterialModule from '@app/shared/material.module';
import { Router, RouterLinkActive, RouterLink } from "@angular/router";
import { MatSidenav } from '@angular/material/sidenav';
import { siteConfig } from '@app/core/config/site.config';

@Component({
  selector: 'app-sidebar',
  imports: [
    MaterialModule,
    RouterLink,
    RouterLinkActive,
],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'] ,
})
export class SidebarComponent {
  private readonly router = inject(Router);
  @ViewChild('sidenav') sidenav!: MatSidenav;
  protected title = siteConfig.title;

  routes: Record<string, string>[];

  toggleSidebar = output<void>();

  constructor() { 
    // list of rroutes for sidebar menu items
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
        path: '/queue',
        label: 'Prioritization',
        icon: 'priority_high'
      },
      {
        path: '/synch',
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

}
