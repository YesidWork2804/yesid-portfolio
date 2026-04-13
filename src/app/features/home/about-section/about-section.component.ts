import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AppButtonComponent } from '../../../shared/components/button/button.component';
import { ViewportAnimateDirective } from '../../../shared/directives/viewport-animate.directive';

@Component({
  selector: 'app-about-section',
  standalone: true,
  imports: [TranslateModule, AppButtonComponent, ViewportAnimateDirective],
  templateUrl: './about-section.component.html',
})
export class AboutSectionComponent {
  readonly softSkills: Array<{ icon: 'chat' | 'lightning' | 'users' | 'target'; labelKey: string }> = [
    { icon: 'chat', labelKey: 'about.soft_skills.communication' },
    { icon: 'users', labelKey: 'about.soft_skills.teamwork' },
    { icon: 'target', labelKey: 'about.soft_skills.ownership' },
    { icon: 'lightning', labelKey: 'about.soft_skills.adaptability' },
  ];

  iconPath(icon: 'chat' | 'lightning' | 'users' | 'target'): string {
    switch (icon) {
      case 'chat':
        return 'M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z';
      case 'users':
        return 'M16 11a4 4 0 1 0-8 0 4 4 0 0 0 8 0Zm5 10a7 7 0 0 0-14 0';
      case 'target':
        return 'M12 2v3m0 14v3m10-10h-3M5 12H2m15.5-6.5-2.1 2.1M8.6 15.4l-2.1 2.1m10.9 0-2.1-2.1M8.6 8.6 6.5 6.5';
      case 'lightning':
        return 'M13 2 3 14h7l-1 8 10-12h-7l1-8Z';
    }
  }
}
