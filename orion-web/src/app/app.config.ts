import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection  } from '@angular/core';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { API_CONFIG_TOKEN } from '@app/core/config/injection-token';
import { API_CONFIG } from '@app/core/config/api.config';
import { authInterceptor } from '@app/core/api/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideHttpClient(
       withInterceptors([authInterceptor])
    ),
    {
      provide: API_CONFIG_TOKEN,
      useValue: API_CONFIG
     },
    provideRouter(
      routes,
      withViewTransitions(),
      withComponentInputBinding(),
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' })
    ),
    
  ]
};
