import { HttpInterceptorFn } from '@angular/common/http';
import { TOKEN_KEY } from '@app/features/auth/data-access/auth.store';
import { StorageService } from '../services/storage.service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const storage = inject(StorageService);
  const token = storage.getData(TOKEN_KEY);

  if (!token) {
    return next(req);
  }

  const cloneReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
  return next(cloneReq);
};
