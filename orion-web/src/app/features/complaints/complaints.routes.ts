import { Routes } from "@angular/router";

export const routes: Routes = [
    {
                path: '',
                loadComponent: () => import('./pages/complaint-list-page/complaint-list-page').then(m => m.ComplaintListPage)
            },
            {
                path: ':id',
                loadComponent: () => import('./pages/complaint-detail-page/complaint-detail-page').then(m => m.ComplaintDetailPage)
            },
            {
                path: 'review/:id',
                loadComponent: () => import('./pages/complaint-review-page/complaint-review-page').then(m => m.ComplaintReviewPage)
            },
]