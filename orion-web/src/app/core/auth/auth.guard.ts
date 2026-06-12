import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TOKEN_KEY } from '@app/features/auth/data-access/auth.store';
import { StorageService } from '../services/storage.service';

export const authGuard: CanActivateFn = () => {
  const storage = inject(StorageService);
  const token = storage.getData(TOKEN_KEY);

  if (!token) {
    return inject(Router).createUrlTree(['/login']);
  }
  return true;
};
