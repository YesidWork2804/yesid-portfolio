import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { inject } from '@angular/core';

export type TechBadge = {
  name: string;
  /** Inline SVG string (e.g. from /assets/icons) */
  icon: string;
  /** Any valid CSS color (hex, rgb, etc.) */
  color: string;
};

@Component({
  selector: 'app-tech-badge',
  standalone: true,
  templateUrl: './badge.component.html',
})
export class TechBadgeComponent {
  private readonly sanitizer = inject(DomSanitizer);

  @Input({ required: true }) tech!: TechBadge;

  get safeIcon(): SafeHtml {
    // Architectural decision:
    // SVG strings coming from our own assets/icons are considered trusted.
    // We bypass sanitization so inline SVG renders consistently.
    return this.sanitizer.bypassSecurityTrustHtml(this.tech.icon);
  }

  get classes(): string {
    return [
      'inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium',
      'bg-slate-100 text-slate-800 dark:bg-surface-100 dark:text-slate-100',
      'ui-transition',
    ].join(' ');
  }
}
