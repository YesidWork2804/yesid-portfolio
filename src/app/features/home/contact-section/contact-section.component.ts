import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ViewportAnimateDirective } from '../../../shared/directives/viewport-animate.directive';

@Component({
  selector: 'app-contact-section',
  standalone: true,
  imports: [TranslateModule, ViewportAnimateDirective],
  templateUrl: './contact-section.component.html',
})
export class ContactSectionComponent {
  readonly links = {
    email:
      'https://mail.google.com/mail/?view=cm&fs=1&to=yesidwork2804@gmail.com',
    github: 'https://github.com/YesidWork2804',
    gitlab: 'https://gitlab.com/yesidwork2804',
    linkedin: 'https://www.linkedin.com/in/yesid-hernandez-ariza',
  };
}
