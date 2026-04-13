import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ViewportAnimateDirective } from '../../../shared/directives/viewport-animate.directive';

@Component({
  selector: 'app-courses-section',
  standalone: true,
  imports: [TranslateModule, ViewportAnimateDirective],
  templateUrl: './courses-section.component.html',
})
export class CoursesSectionComponent {
  readonly platziProfileUrl = 'https://platzi.com/p/yesidwork2804/';
}
