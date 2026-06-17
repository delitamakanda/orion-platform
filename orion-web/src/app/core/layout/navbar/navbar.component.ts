import { ChangeDetectionStrategy, Component, computed, inject, output } from '@angular/core';
import { Router } from '@angular/router';
import { MATERIAL_IMPORTS } from '@app/shared/material.imports';
import { AuthStore } from '@app/features/auth/data-access/auth.store';
import { AvatarComponent } from '@app/shared/ui/avatar/avatar.component';
import { siteConfig } from '@app/core/config/site.config';
import { NotificationStore } from '@app/features/notifications/data-access/notification.store';

@Component({
  selector: 'app-navbar',
  imports: [MATERIAL_IMPORTS, AvatarComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  private readonly router = inject(Router);
  private readonly store = inject(AuthStore);
  readonly notificationStore = inject(NotificationStore);

  readonly sidebarToggle = output<void>();

  protected readonly title = siteConfig.title;
  protected readonly user = this.store.user;
  protected readonly fullName = computed(() => {
    const u = this.store.user();
    if (!u) return '';
    return `${u.first_name} ${u.last_name}`.trim();
  });

  protected logout(): void {
    this.store.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}
