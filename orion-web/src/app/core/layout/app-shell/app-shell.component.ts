import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import MaterialModule from '@app/shared/material.module';
@Component({
  selector: 'app-shell',
  imports: [
    SidebarComponent,
    RouterOutlet,
    MaterialModule,
  ],
  standalone: true,
  templateUrl: './app-shell.component.html',
  styleUrls: ['./app-shell.component.css'],
})
export class AppShellComponent {
}
