import { Component, EventEmitter, Input, Output } from '@angular/core';

type ButtonVariant = 'primary' | 'outline' | 'ghost';

type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-button',
  standalone: true,
  templateUrl: './button.component.html',
})
export class AppButtonComponent {
  @Input() type: 'button' | 'submit' = 'button';
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() disabled = false;

  @Output() clicked = new EventEmitter<MouseEvent>();

  get classes(): string {
    const base =
      'inline-flex items-center justify-center rounded-md font-medium ui-transition focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:opacity-50 disabled:pointer-events-none';

    const variant = (() => {
      switch (this.variant) {
        case 'primary':
          return 'bg-primary text-white hover:bg-primary-700 shadow-sm';
        case 'outline':
          return 'border border-slate-200 dark:border-slate-700 bg-transparent text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-surface-100';
        case 'ghost':
          return 'bg-transparent text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-surface-100';
      }
    })();

    const size = (() => {
      switch (this.size) {
        case 'sm':
          return 'h-8 px-3 text-sm';
        case 'md':
          return 'h-10 px-4 text-sm';
        case 'lg':
          return 'h-12 px-5 text-base';
      }
    })();

    return [base, variant, size].join(' ');
  }
}
