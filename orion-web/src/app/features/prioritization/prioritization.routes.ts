import { Routes } from "@angular/router";

export const prioritizationRoutes: Routes = [
    {
        path: "queue",
        loadComponent: () => import("./pages/prioritization-page/prioritization-page").then(m => m.PrioritizationPage),
    },
    {
        path: "details/:id",
        loadComponent: () => import("./pages/prioritization-detail-page/priority-detail-page").then(m => m.PriorityDetailPage),
    }
]