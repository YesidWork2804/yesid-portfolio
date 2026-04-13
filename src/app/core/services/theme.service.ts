import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type ThemeMode = 'light' | 'dark';

const STORAGE_KEY = 'portfolio_theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);

  private readonly themeSubject = new BehaviorSubject<ThemeMode>('light');
  readonly theme$ = this.themeSubject.asObservable();

  get current(): ThemeMode {
    return this.themeSubject.value;
  }

  /**
   * Boot-time initialization.
   *
   * Architectural decision:
   * - The service is the single source of truth for the theme.
   * - Tailwind uses `darkMode: 'class'`, so we toggle `dark` on <html>.
   * - We persist the user choice in localStorage to keep UX consistent.
   */
  init(): void {
    const stored = this.safeReadStorage();
    const initial: ThemeMode = stored ?? (this.prefersDark() ? 'dark' : 'light');
    this.setTheme(initial);
  }

  toggle(): void {
    this.setTheme(this.current === 'dark' ? 'light' : 'dark');
  }

  setTheme(mode: ThemeMode): void {
    this.themeSubject.next(mode);

    const root = this.document.documentElement;
    root.classList.toggle('dark', mode === 'dark');

    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch {
      // Ignore storage errors (private mode / blocked storage).
    }
  }

  private prefersDark(): boolean {
    return typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches;
  }

  private safeReadStorage(): ThemeMode | null {
    try {
      const value = localStorage.getItem(STORAGE_KEY);
      return value === 'dark' || value === 'light' ? value : null;
    } catch {
      return null;
    }
  }
}
