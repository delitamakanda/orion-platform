import { Routes } from "@angular/router";

export const auditsRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/audits-page/audits-page').then(m => m.AuditsPage)
    }
];