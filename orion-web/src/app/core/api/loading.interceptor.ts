import { HttpContextToken, HttpInterceptorFn } from '@angular/common/http';
import { LoadingService } from '../services/loading.service';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';

export const SKIP_LOADING_INTERCEPTOR = new HttpContextToken<boolean>(() => false);

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.context.get(SKIP_LOADING_INTERCEPTOR)) {
    return next(req);
  }
  const service = inject(LoadingService);
  service.show();
  return next(req).pipe(finalize(() => service.hide()));
};
