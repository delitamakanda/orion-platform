import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const token = localStorage.getItem('auth_token');

  if (!token) {
    return inject(Router).createUrlTree(['/login']);
  }
  return true;
};
