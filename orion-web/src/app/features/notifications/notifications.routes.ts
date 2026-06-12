import { Routes } from "@angular/router";

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/notifications-page/notifications-page').then(m => m.NotificationsPage)
    }
];