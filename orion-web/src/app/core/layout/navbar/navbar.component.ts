import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, output } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthStore } from '@app/features/auth/data-access/auth.store';
import { AvatarComponent } from '@app/shared/ui/avatar/avatar.component';
import { siteConfig } from '@app/core/config/site.config';
import { NotificationStore } from '@app/features/notifications/data-access/notification.store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBadgeModule } from '@angular/material/badge';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-navbar',
  imports: [
    MatButtonModule,
    MatDividerModule,
    MatMenuModule,
    MatIconModule,
    MatTooltipModule,
    MatBadgeModule,
    MatToolbarModule,
    RouterLink,
    RouterLinkActive,
    AvatarComponent,
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  private readonly router = inject(Router);
  private readonly store = inject(AuthStore);
  private readonly destroyRef = inject(DestroyRef);
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
    this.store
      .logout()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.router.navigate(['/login']);
      });
  }
}
