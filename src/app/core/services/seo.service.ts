import { Injectable, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly translate = inject(TranslateService);
  private readonly document = inject(DOCUMENT);

  private initialized = false;

  /**
   * Architectural decision:
   * - We keep SEO as a Core singleton service.
   * - Sections (lazy routes) only declare `data.titleKey` / `data.descriptionKey`.
   * - This service translates those keys and updates <title> and meta description.
   */
  init(): void {
    if (this.initialized) return;
    this.initialized = true;

    const apply = () => this.applyFromRoute();

    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(apply);

    this.translate.onLangChange.subscribe(apply);

    // Initial application.
    apply();
  }

  private applyFromRoute(): void {
    const deepest = this.getDeepestChild(this.activatedRoute);
    const data = deepest.snapshot.data as {
      titleKey?: string;
      descriptionKey?: string;
    };

    const title = data.titleKey ? this.translate.instant(data.titleKey) : '';
    const description = data.descriptionKey
      ? this.translate.instant(data.descriptionKey)
      : '';

    if (title) {
      this.title.setTitle(title);
      this.meta.updateTag({ property: 'og:title', content: title });
    }

    if (description) {
      this.meta.updateTag({ name: 'description', content: description });
      this.meta.updateTag({ property: 'og:description', content: description });
    }

    const url = this.getCurrentUrl();
    if (url) {
      this.meta.updateTag({ property: 'og:url', content: url });
      this.upsertCanonical(url);
    }

    this.upsertJsonLdPerson();
  }

  private getCurrentUrl(): string {
    const origin =
      typeof window !== 'undefined' && window.location?.origin
        ? window.location.origin
        : '';

    const path = this.router.url || '/';
    if (!origin) return '';
    return new URL(path, origin).toString();
  }

  private upsertCanonical(url: string): void {
    const head = this.document.head;
    if (!head) return;

    let link = head.querySelector(
      'link[rel="canonical"]',
    ) as HTMLLinkElement | null;
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  private upsertJsonLdPerson(): void {
    const head = this.document.head;
    if (!head) return;

    const id = 'jsonld-person';
    let script = this.document.getElementById(id) as HTMLScriptElement | null;
    if (!script) {
      script = this.document.createElement('script');
      script.id = id;
      script.type = 'application/ld+json';
      head.appendChild(script);
    }

    const origin =
      typeof window !== 'undefined' && window.location?.origin
        ? window.location.origin
        : '';

    const data = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Yesid Hernández',
      url: origin || undefined,
      jobTitle: 'Full Stack Developer',
      sameAs: [
        'https://github.com/YesidWork2804',
        'https://gitlab.com/yesidwork2804',
        'https://www.linkedin.com/',
      ],
    };

    script.text = JSON.stringify(data);
  }

  private getDeepestChild(route: ActivatedRoute): ActivatedRoute {
    let current = route;
    while (current.firstChild) {
      current = current.firstChild;
    }
    return current;
  }
}
