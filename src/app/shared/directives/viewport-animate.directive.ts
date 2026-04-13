import {
  Directive,
  ElementRef,
  Input,
  AfterViewInit,
  inject,
} from '@angular/core';

type ViewportAnimation = 'fade-up' | 'fade-in';

@Directive({
  selector: '[appViewportAnimate]',
  standalone: true,
})
export class ViewportAnimateDirective implements AfterViewInit {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);

  @Input('appViewportAnimate') animation: ViewportAnimation = 'fade-up';
  @Input() staggerChildren = false;

  ngAfterViewInit(): void {
    const element = this.el.nativeElement;

    if (this.prefersReducedMotion()) {
      return;
    }

    if (this.isSmallScreen()) {
      return;
    }

    const baseHidden = ['opacity-0'];
    const baseVisible = ['opacity-100'];

    const transformHidden =
      this.animation === 'fade-up' ? ['translate-y-4'] : [];
    const transformVisible =
      this.animation === 'fade-up' ? ['translate-y-0'] : [];

    element.classList.add(
      ...baseHidden,
      ...transformHidden,
      'transition-opacity',
      'transition-transform',
      'will-change-transform',
      'will-change-opacity',
      'duration-700',
      'ease-out',
    );

    const reveal = () => {
      element.classList.remove(...baseHidden, ...transformHidden);
      element.classList.add(...baseVisible, ...transformVisible);

      if (this.staggerChildren) {
        const nodeList = element.querySelectorAll(
          '[data-stagger]',
        ) as NodeListOf<HTMLElement>;
        const children = Array.from(nodeList);
        children.forEach((child: HTMLElement, i) => {
          child.style.transitionDelay = `${i * 80}ms`;
          child.classList.add('opacity-100', 'translate-y-0');
        });
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (!entry.isIntersecting) return;

        reveal();

        observer.disconnect();
      },
      { threshold: 0.15 },
    );

    observer.observe(element);

    // Ensure above-the-fold elements are revealed on initial load without
    // requiring a scroll/mouse event to trigger the observer callback.
    requestAnimationFrame(() => {
      const rect = element.getBoundingClientRect();
      const vh = window.innerHeight || 0;
      const isVisible = rect.top < vh && rect.bottom > 0;
      if (!isVisible) return;
      reveal();
      observer.disconnect();
    });
  }

  private prefersReducedMotion(): boolean {
    return (
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    );
  }

  private isSmallScreen(): boolean {
    return (
      typeof window !== 'undefined' &&
      window.matchMedia?.('(max-width: 640px)').matches
    );
  }
}
