import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthStore, TOKEN_KEY } from '@app/features/auth/data-access/auth.store';
import { Role } from '../models/role.model';
import { StorageService } from '../services/storage.service';

export const roleGuard: CanActivateFn = (route): boolean | UrlTree => {
  const store = inject(AuthStore);
  const router = inject(Router);
  const storage = inject(StorageService);
  const token = storage.getData(TOKEN_KEY);

  const allowedRoles = route.data['roles'] as Role[] | undefined;

  if (!token) {
    return router.createUrlTree(['/login']);
  }

  if (!allowedRoles || allowedRoles.length === 0) {
    return router.createUrlTree(['/unauthorized']);
  }

  if (store.hasRole(allowedRoles)) {
    return true;
  }

  return router.createUrlTree(['/unauthorized']);
};
