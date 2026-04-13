import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class I18nService {
  private readonly translate = inject(TranslateService);
  private readonly document = inject(DOCUMENT);

  /**
   * Architectural decision:
   * - i18n is initialized once in Core (bootstrapped via APP_INITIALIZER).
   * - We detect the browser language and map it to supported langs.
   * - Lazy-loaded features rely on the same singleton TranslateService instance.
   */
  init(): void {
    const supported = ['en', 'es'] as const;

    this.translate.addLangs([...supported]);
    this.translate.setDefaultLang('en');

    const browserLang = this.detectBrowserLang();
    const initial = supported.includes(browserLang) ? browserLang : 'en';

    this.translate.use(initial);

    // Keep <html lang=".."> aligned for accessibility and SEO.
    this.setDocumentLang(initial);
    this.translate.onLangChange.subscribe((e) => this.setDocumentLang(e.lang));
  }

  private setDocumentLang(lang: string): void {
    this.document.documentElement.lang = lang;
  }

  private detectBrowserLang(): 'en' | 'es' {
    const raw = typeof navigator !== 'undefined' ? navigator.language : 'en';
    const normalized = raw.split('-')[0]?.toLowerCase();
    return normalized === 'es' ? 'es' : 'en';
  }
}
