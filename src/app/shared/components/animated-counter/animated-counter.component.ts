import { Component, Input, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-animated-counter',
  standalone: true,
  templateUrl: './animated-counter.component.html'
})
export class AnimatedCounterComponent implements OnInit, OnDestroy {
  @Input({ required: true }) value!: number;
  @Input() durationMs = 1200;
  @Input() prefix = '';
  @Input() suffix = '';

  displayValue = 0;

  private rafId: number | null = null;
  private startTime: number | null = null;

  ngOnInit(): void {
    this.start();
  }

  ngOnDestroy(): void {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
    }
  }

  private start(): void {
    const target = Number.isFinite(this.value) ? this.value : 0;
    const duration = Math.max(0, this.durationMs);

    const step = (ts: number) => {
      if (this.startTime === null) this.startTime = ts;
      const elapsed = ts - this.startTime;
      const t = duration === 0 ? 1 : Math.min(1, elapsed / duration);

      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3);
      this.displayValue = Math.round(eased * target);

      if (t < 1) {
        this.rafId = requestAnimationFrame(step);
      }
    };

    this.rafId = requestAnimationFrame(step);
  }
}
