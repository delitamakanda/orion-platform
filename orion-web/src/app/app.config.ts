import {
  ApplicationConfig,
  inject,
  provideBrowserGlobalErrorListeners,
  provideAppInitializer,
  provideZonelessChangeDetection,
  LOCALE_ID,
} from '@angular/core';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { API_CONFIG_TOKEN } from '@app/core/config/injection-token';
import { API_CONFIG } from '@app/core/config/api.config';
import { authInterceptor } from '@app/core/api/auth.interceptor';
import { MATERIAL_PROVIDERS } from './shared/material.imports';
import { loadingInterceptor } from './core/api/loading.interceptor';
import { errorInterceptor } from './core/api/error.interceptor';
import { AuthStore, TOKEN_KEY } from '@app/features/auth/data-access/auth.store';
import { StorageService } from '@app/core/services/storage.service';
import { catchError, firstValueFrom, of } from 'rxjs';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr, 'fr-FR');

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideHttpClient(withInterceptors([authInterceptor, errorInterceptor, loadingInterceptor])),
    {
      provide: API_CONFIG_TOKEN,
      useValue: API_CONFIG,
    },
    ...MATERIAL_PROVIDERS,
    {
      provide: LOCALE_ID,
      useValue: 'fr-FR',
    },
    provideRouter(
      routes,
      withViewTransitions(),
      withComponentInputBinding(),
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' }),
    ),
    provideAppInitializer(() => {
      const authStore = inject(AuthStore);
      const storage = inject(StorageService);
      const token = storage.getData<string>(TOKEN_KEY);
      if (!token) return;
      return firstValueFrom(authStore.fetchUser().pipe(catchError(() => of(null))));
    }),
  ],
};
