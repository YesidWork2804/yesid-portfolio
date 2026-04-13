import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  templateUrl: './card.component.html'
})
export class CardComponent {
  @Input() padded = true;

  get classes(): string {
    const base = 'rounded-xl border border-slate-200/70 dark:border-slate-800 bg-white dark:bg-surface-100';
    const padding = this.padded ? 'p-6' : '';
    return [base, padding].filter(Boolean).join(' ');
  }
}
