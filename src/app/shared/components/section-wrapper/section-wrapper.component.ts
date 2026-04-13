import { Component, ElementRef, Input, AfterViewInit, inject } from '@angular/core';

@Component({
  selector: 'app-section-wrapper',
  standalone: true,
  templateUrl: './section-wrapper.component.html'
})
export class SectionWrapperComponent implements AfterViewInit {
  private readonly host = inject(ElementRef<HTMLElement>);

  @Input() padded = true;

  visible = false;

  get sectionClasses(): string {
    const base = 'mx-auto max-w-6xl px-4';
    const padding = this.padded ? 'py-16 sm:py-20' : '';
    return [base, padding].filter(Boolean).join(' ');
  }

  get animationClasses(): string {
    return this.visible
      ? 'opacity-100 translate-y-0'
      : 'opacity-0 translate-y-4';
  }

  ngAfterViewInit(): void {
    // Architectural decision:
    // We avoid runtime deps (AOS) by using IntersectionObserver + Tailwind transitions.
    const el = this.host.nativeElement;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting) {
          this.visible = true;
          observer.disconnect();
        }
      },
      { root: null, threshold: 0.15 }
    );

    observer.observe(el);
  }
}
