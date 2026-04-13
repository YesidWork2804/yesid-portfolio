import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ViewportAnimateDirective } from '../../../../shared/directives/viewport-animate.directive';
import { EvidenceItem } from '../impact-real.data';

@Component({
  selector: 'app-evidence-gallery',
  standalone: true,
  imports: [TranslateModule, ViewportAnimateDirective],
  templateUrl: './evidence-gallery.component.html',
})
export class EvidenceGalleryComponent {
  @Input({ required: true }) items!: EvidenceItem[];
  @Output() open = new EventEmitter<number>();

  readonly loaded = new Set<number>();

  markLoaded(i: number): void {
    this.loaded.add(i);
  }

  isLoaded(i: number): boolean {
    return this.loaded.has(i);
  }

  openAt(i: number): void {
    this.open.emit(i);
  }
}
