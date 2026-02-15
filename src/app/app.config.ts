import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';


import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import Material from '@primeuix/themes/material';
import { provideHttpClient } from '@angular/common/http';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
     providePrimeNG({
         ripple: true,
      theme: {
        preset: Aura,
        options: {
          prefix: 'p',
          // darkModeSelector: '.app-dark',
          cssLayer: false
        }
      }
    }),

  ]
};
