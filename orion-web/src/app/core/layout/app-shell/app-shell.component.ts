import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { MATERIAL_IMPORTS } from '@app/shared/material.imports';
@Component({
  selector: 'app-shell',
  imports: [
    SidebarComponent,
    RouterOutlet,
    MATERIAL_IMPORTS,
  ],
  standalone: true,
  templateUrl: './app-shell.component.html',
  styleUrls: ['./app-shell.component.css'],
})
export class AppShellComponent {
}
