import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./core/layout/app-shell/app-shell.component').then(m => m.AppShellComponent),
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('./features/dashboard/pages/dashboard-page/dashboard-page').then(m => m.DashboardPage)
            },
            { 
                path: '**', 
                redirectTo: 'dashboard',
            }
        ],
    },
];
