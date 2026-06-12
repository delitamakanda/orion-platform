import { Routes } from '@angular/router';
import { AppShellComponent } from '@app/core/layout/app-shell/app-shell.component';
import { authGuard } from '@app/core/auth/auth.guard';

export const routes: Routes = [
    {
        path: '',
        component: AppShellComponent,
        canActivate: [authGuard],
        children: [
            { 
                path: 'dashboard', 
                loadChildren: () => import('./features/dashboard/dashboard.routes').then(m => m.routes),
            },
            {
                path: 'complaints',
                loadChildren: () => import('./features/complaints/complaints.routes').then(m => m.routes),
            },
            {
                path: 'prioritization',
                loadChildren: () => import('./features/prioritization/prioritization.routes').then(m => m.routes),
            },
            {
                path: 'integrations',
                loadChildren: () => import('./features/integrations/integrations.routes').then(m => m.routes),
            },
            {
                path: 'audits',
                loadChildren: () => import('./features/audits/audits.routes').then(m => m.routes),
            },
            {
                path: 'notifications',
                loadChildren: () => import('./features/notifications/notifications.routes').then(m => m.routes),
            },
            {
                path: '**',
                pathMatch: 'full',
                redirectTo: 'dashboard',
            }
        ],
    },
    {
        path: 'login',
        loadComponent: () => import('./features/auth/pages/auth-page/auth-page').then(m => m.AuthPage),
    }
];
