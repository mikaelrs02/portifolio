import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import {
  provideTransloco,
  translocoConfig,
} from '@jsverse/transloco';
import { routes } from './app.routes';
import { TranslocoHttpLoader } from './core/loaders/transloco-http.loader';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    provideRouter(routes),
    provideTransloco({
      config: translocoConfig({
        availableLangs: ['pt', 'en'],
        defaultLang: 'pt',
        reRenderOnLangChange: true,
      }),
      loader: TranslocoHttpLoader,
    }),
  ],
};
