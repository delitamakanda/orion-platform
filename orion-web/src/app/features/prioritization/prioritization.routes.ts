import { Routes } from "@angular/router";

export const routes: Routes = [
    {
        path: "",
        loadComponent: () => import("./pages/prioritization-page/prioritization-page").then(m => m.PrioritizationPage),
    },
    {
        path: "details/:id",
        loadComponent: () => import("./pages/prioritization-detail-page/priority-detail-page").then(m => m.PriorityDetailPage),
    }
]