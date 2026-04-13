import { Component, HostListener, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ThemeService } from '../../core/services/theme.service';
import {
  ScrollSpyService,
  SectionId,
} from '../../core/services/scroll-spy.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  private readonly translate = inject(TranslateService);
  private readonly router = inject(Router);
  readonly theme = inject(ThemeService);
  readonly scrollSpy = inject(ScrollSpyService);

  mobileOpen = false;

  readonly sections: Array<{
    id: SectionId;
    fragment: string;
    labelKey: string;
  }> = [
    { id: 'home', fragment: 'home', labelKey: 'nav.home' },
    { id: 'about', fragment: 'about', labelKey: 'nav.about' },
    { id: 'stack', fragment: 'stack', labelKey: 'nav.stack' },
    { id: 'projects', fragment: 'projects', labelKey: 'nav.projects' },
    { id: 'impact', fragment: 'impact', labelKey: 'nav.impact' },
    { id: 'experience', fragment: 'experience', labelKey: 'nav.experience' },
    // { id: 'courses', fragment: 'courses', labelKey: 'nav.courses' },
    { id: 'contact', fragment: 'contact', labelKey: 'nav.contact' },
  ];

  get isDark(): boolean {
    return this.theme.current === 'dark';
  }

  get currentLang(): string {
    return this.translate.currentLang || this.translate.defaultLang || 'en';
  }

  setLang(lang: 'en' | 'es'): void {
    this.translate.use(lang);
  }

  toggleTheme(): void {
    this.theme.toggle();
  }

  toggleMobile(): void {
    this.mobileOpen = !this.mobileOpen;
  }

  closeMobile(): void {
    this.mobileOpen = false;
  }

  hidden = false;
  scrolled = false;
  private lastScrollY = 0;

  get headerClasses(): string {
    const base =
      'fixed top-0 left-0 right-0 z-50 border-b border-slate-200/70 dark:border-slate-800 backdrop-blur ui-transition transform-gpu transition-transform duration-300';

    const translate =
      this.hidden && !this.mobileOpen ? '-translate-y-full' : 'translate-y-0';

    const bg = this.scrolled
      ? 'bg-white/90 dark:bg-surface/90 shadow-sm'
      : 'bg-white/70 dark:bg-surface/70';

    return [base, translate, bg].join(' ');
  }

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.lastScrollY = window.scrollY || 0;
      this.scrolled = this.lastScrollY > 4;
    }
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    const y = typeof window !== 'undefined' ? window.scrollY || 0 : 0;
    this.scrolled = y > 4;

    const delta = y - this.lastScrollY;

    if (y < 16) {
      this.hidden = false;
      this.lastScrollY = y;
      return;
    }

    if (delta > 8) {
      this.hidden = true;
    } else if (delta < -8) {
      this.hidden = false;
    }

    this.lastScrollY = y;
  }

  async goTo(fragment: string): Promise<void> {
    // Ensure we are on Home route and then scroll to fragment.
    await this.router.navigate(['/'], { fragment });
    this.closeMobile();
  }
}
