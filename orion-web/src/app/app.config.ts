import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { API_CONFIG_TOKEN } from '@app/core/config/injection-token';
import { API_CONFIG } from '@app/core/config/api.config';
import { authInterceptor } from '@app/core/api/auth.interceptor';
import { MATERIAL_PROVIDERS } from './shared/material.imports';
import { loadingInterceptor } from './core/api/loading.interceptor';
import { errorInterceptor } from './core/api/error.interceptor';

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
    provideRouter(
      routes,
      withViewTransitions(),
      withComponentInputBinding(),
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' }),
    ),
  ],
};
