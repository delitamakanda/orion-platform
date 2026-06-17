import { ChangeDetectionStrategy, Component, inject, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { LoadingService } from '@app/core/services/loading.service';
import { MATERIAL_IMPORTS } from '@app/shared/material.imports';

@Component({
  selector: 'app-shell',
  imports: [SidebarComponent, NavbarComponent, RouterOutlet, MATERIAL_IMPORTS],
  templateUrl: './app-shell.component.html',
  styleUrls: ['./app-shell.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppShellComponent {
  readonly service = inject(LoadingService);
  @ViewChild(SidebarComponent) private readonly sidebar!: SidebarComponent;

  protected onSidebarToggle(): void {
    this.sidebar.toggle();
  }
}
