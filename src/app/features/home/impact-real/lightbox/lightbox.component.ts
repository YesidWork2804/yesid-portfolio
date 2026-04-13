import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { EvidenceItem } from '../impact-real.data';

@Component({
  selector: 'app-lightbox',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './lightbox.component.html',
})
export class LightboxComponent {
  @Input() open = false;
  @Input() items: EvidenceItem[] = [];
  @Input() index = 0;
  @Output() indexChange = new EventEmitter<number>();
  @Output() closed = new EventEmitter<void>();

  readonly loaded = new Set<number>();

  close(): void {
    this.closed.emit();
  }

  prev(): void {
    if (!this.items.length) return;
    const nextIndex = (this.index - 1 + this.items.length) % this.items.length;
    this.indexChange.emit(nextIndex);
  }

  next(): void {
    if (!this.items.length) return;
    const nextIndex = (this.index + 1) % this.items.length;
    this.indexChange.emit(nextIndex);
  }

  markLoaded(i: number): void {
    this.loaded.add(i);
  }

  isLoaded(i: number): boolean {
    return this.loaded.has(i);
  }

  get active(): EvidenceItem | null {
    return this.items[this.index] ?? null;
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(ev: KeyboardEvent): void {
    if (!this.open) return;

    if (ev.key === 'Escape') {
      this.close();
    } else if (ev.key === 'ArrowLeft') {
      this.prev();
    } else if (ev.key === 'ArrowRight') {
      this.next();
    }
  }
}
