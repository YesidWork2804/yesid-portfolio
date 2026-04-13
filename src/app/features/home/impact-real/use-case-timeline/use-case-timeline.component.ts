import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ViewportAnimateDirective } from '../../../../shared/directives/viewport-animate.directive';
import { TechIconComponent } from '../../projects/tech-icon/tech-icon.component';
import { UseCaseMilestone } from '../impact-real.data';

@Component({
  selector: 'app-use-case-timeline',
  standalone: true,
  imports: [TranslateModule, ViewportAnimateDirective, TechIconComponent],
  templateUrl: './use-case-timeline.component.html',
})
export class UseCaseTimelineComponent {
  @Input({ required: true }) milestones!: UseCaseMilestone[];
}
