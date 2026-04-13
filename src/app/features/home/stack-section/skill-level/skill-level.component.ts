import { AfterViewInit, Component, ElementRef, Input, OnDestroy, inject } from '@angular/core';

@Component({
  selector: 'app-skill-level',
  standalone: true,
  templateUrl: './skill-level.component.html',
})
export class SkillLevelComponent implements AfterViewInit, OnDestroy {
  private readonly host = inject(ElementRef<HTMLElement>);

  @Input() level = 0; // 0..100

  filled = false;
  private observer: IntersectionObserver | null = null;

  ngAfterViewInit(): void {
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    if (reduced) {
      this.filled = true;
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting) {
          this.filled = true;
          this.observer?.disconnect();
          this.observer = null;
        }
      },
      { threshold: 0.35 },
    );

    this.observer.observe(this.host.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  get barStyle(): { width: string } {
    const safe = Math.max(0, Math.min(100, this.level));
    return { width: this.filled ? `${safe}%` : '0%' };
  }
}
