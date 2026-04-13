import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ViewportAnimateDirective } from '../../../../shared/directives/viewport-animate.directive';
import { Testimonial } from '../impact-real.data';

@Component({
  selector: 'app-impact-testimonial',
  standalone: true,
  imports: [TranslateModule, ViewportAnimateDirective],
  templateUrl: './testimonial.component.html',
})
export class TestimonialComponent {
  @Input({ required: true }) testimonial!: Testimonial;
}
