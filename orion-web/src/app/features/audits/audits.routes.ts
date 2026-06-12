import { Routes } from "@angular/router";

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/audits-page/audits-page').then(m => m.AuditsPage)
    }
];