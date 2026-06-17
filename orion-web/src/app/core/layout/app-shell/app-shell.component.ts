import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-shell',
  imports: [SidebarComponent, NavbarComponent, RouterOutlet],
  templateUrl: './app-shell.component.html',
  styleUrls: ['./app-shell.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppShellComponent {
  @ViewChild(SidebarComponent) private readonly sidebar!: SidebarComponent;

  protected onSidebarToggle(): void {
    this.sidebar.toggle();
  }
}
