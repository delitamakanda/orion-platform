import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./core/layout/app-shell.component').then(m => m.AppShellComponent),
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('./features/dashboard/dashboard-page/dashboard-page').then(m => m.DashboardPage)
            },
            {
                path: 'complaints',
                loadComponent: () => import('./features/complaints/pages/complaint-list-page/complaint-list-page').then(m => m.ComplaintListPage)
            },
            {
                path: 'complaints/:id',
                loadComponent: () => import('./features/complaints/pages/complaint-detail-page/complaint-detail-page').then(m => m.ComplaintDetailPage)
            },
            {
                path: 'complaints/new',
                loadComponent: () => import('./features/complaints/pages/complaint-create-page/complaint-create-page').then(m => m.ComplaintCreatePage)
            },
            { 
                path: '**', 
                redirectTo: 'dashboard',
            }
        ],
    },
];
