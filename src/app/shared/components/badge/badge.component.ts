import { Component, Input } from '@angular/core';

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
  @Input({ required: true }) tech!: TechBadge;

  get classes(): string {
    return [
      'inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium',
      'bg-slate-100 text-slate-800 dark:bg-surface-100 dark:text-slate-100',
      'ui-transition',
    ].join(' ');
  }
}
