import { CanActivateFn } from '@angular/router';

export const roleGuard: CanActivateFn = () => {
  // Add your role-based authorization logic here

  return true;
};
