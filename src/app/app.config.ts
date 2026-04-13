import {
  importProvidersFrom,
  APP_INITIALIZER,
  ApplicationConfig,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient, HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { routes } from './app.routes';
import { ThemeService } from './core/services/theme.service';
import { SeoService } from './core/services/seo.service';
import { I18nService } from './core/services/i18n.service';

export function httpTranslateLoader(http: HttpClient): TranslateLoader {
  // Architectural decision:
  // - JSON files are stored in /assets/i18n to keep i18n independent from Angular compilation.
  // - This allows lazy features to share the same translation registry.
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function appInitializer(
  theme: ThemeService,
  i18n: I18nService,
  seo: SeoService,
): () => void {
  // Architectural decision:
  // We centralize boot logic here so individual components remain purely presentational.
  return () => {
    theme.init();
    i18n.init();
    seo.init();
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
      }),
    ),
    provideHttpClient(),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: httpTranslateLoader,
          deps: [HttpClient],
        },
      }),
    ),
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      deps: [ThemeService, I18nService, SeoService],
      multi: true,
    },
  ],
};
