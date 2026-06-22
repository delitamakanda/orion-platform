import { Routes } from '@angular/router';
import { prioritizationResolver } from './resolvers/prioritization.resolver';

export const prioritizationRoutes: Routes = [
  {
    path: 'queue',
    loadComponent: () => import('./pages/prioritization-page/prioritization-page').then((m) => m.PrioritizationPage),
  },
  {
    path: 'details/:complaintId',
    loadComponent: () =>
      import('./pages/prioritization-detail-page/priority-detail-page').then((m) => m.PriorityDetailPage),
    resolve: {
      prioritizationData: prioritizationResolver,
    },
  },
];
