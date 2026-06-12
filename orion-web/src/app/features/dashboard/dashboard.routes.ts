import { Routes } from "@angular/router";

export const routes: Routes = [
    {
        path: "",
        loadComponent: () => import('./pages/dashboard-page/dashboard-page').then(m => m.DashboardPage),
    }
]