import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AnimatedCounterComponent } from '../../../../shared/components/animated-counter/animated-counter.component';
import { ViewportAnimateDirective } from '../../../../shared/directives/viewport-animate.directive';
import { ImpactMetric } from '../impact-real.data';

@Component({
  selector: 'app-impact-metrics',
  standalone: true,
  imports: [
    TranslateModule,
    AnimatedCounterComponent,
    ViewportAnimateDirective,
  ],
  templateUrl: './impact-metrics.component.html',
})
export class ImpactMetricsComponent {
  @Input({ required: true }) metrics!: ImpactMetric[];

  iconPath(icon: ImpactMetric['icon']): string {
    switch (icon) {
      case 'building':
        return 'M4 21V3h16v18M7 21v-4m4 4v-4m4 4v-4M8 7h2m4 0h2M8 11h2m4 0h2M8 15h2m4 0h2';
      case 'truck':
        return 'M3 7h11v10H3V7Zm11 3h4l3 3v4h-7v-7Zm-8 9a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z';
      case 'calendar':
        return 'M7 2v3M17 2v3M4 7h16M5 10h14v11H5V10Zm3 3h3m-3 4h3m4-4h3m-3 4h3';
    }
  }
}
