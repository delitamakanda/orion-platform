import { Routes } from '@angular/router';
import { complaintResolverResolver } from './resolvers/complaint.resolver-resolver';

export const complaintsRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/complaint-list-page/complaint-list-page').then((m) => m.ComplaintListPage),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./pages/complaint-detail-page/complaint-detail-page').then((m) => m.ComplaintDetailPage),
    resolve: {
      complaintData: complaintResolverResolver,
    },
  },
];
