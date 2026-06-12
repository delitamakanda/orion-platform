import { Routes } from "@angular/router";

export const integrationsRoutes: Routes = [
    {
        path: 'sync',
        loadComponent: () => import('./pages/sync-monitoring-page/sync-monitoring-page').then(m => m.SyncMonitoringPage)
    }
];