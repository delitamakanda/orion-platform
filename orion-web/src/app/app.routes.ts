import { Routes } from '@angular/router';
import { AppShellComponent } from '@app/core/layout/app-shell/app-shell.component';
import { authGuard } from '@app/core/auth/auth.guard';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./features/auth/pages/auth-page/auth-page').then(m => m.AuthPage),
    },
    {
        path: '',
        component: AppShellComponent,
        canActivate: [authGuard],
        children: [
            { 
                path: 'dashboard', 
                loadChildren: () => import('./features/dashboard/dashboard.routes').then(m => m.dashboardRoutes),
                data: { title: 'Dashboard' },
            },
            {
                path: 'complaints',
                loadChildren: () => import('./features/complaints/complaints.routes').then(m => m.complaintsRoutes),
                data: { title: 'Plaintes' },
            },
            {
                path: 'prioritization',
                loadChildren: () => import('./features/prioritization/prioritization.routes').then(m => m.prioritizationRoutes),
                data: { title: 'Priorisation' },
            },
            {
                path: 'integrations',
                loadChildren: () => import('./features/integrations/integrations.routes').then(m => m.integrationsRoutes),
                data: { title: 'Synchronisation' },
            },
            {
                path: 'audits',
                loadChildren: () => import('./features/audits/audits.routes').then(m => m.auditsRoutes),
                data: { title: 'Audits' },
            },
            {
                path: 'notifications',
                loadChildren: () => import('./features/notifications/notifications.routes').then(m => m.notificationsRoutes),
                data: { title: 'Notifications' },
            },
            {
                path: '**',
                pathMatch: 'full',
                redirectTo: 'dashboard',
            }
        ],
    }
];
