import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ViewportAnimateDirective } from '../../../shared/directives/viewport-animate.directive';
import { TechIconComponent } from '../projects/tech-icon/tech-icon.component';

type StackCategory = {
  id: 'frontend' | 'backend' | 'db' | 'devops' | 'tools';
  titleKey: string;
  skills: string[];
};

@Component({
  selector: 'app-stack-section',
  standalone: true,
  imports: [TranslateModule, ViewportAnimateDirective, TechIconComponent],
  templateUrl: './stack-section.component.html',
})
export class StackSectionComponent {
  readonly categories: StackCategory[] = [
    {
      id: 'frontend',
      titleKey: 'stack.categories.frontend',
      skills: [
        'Angular',
        'TypeScript',
        'JavaScript',
        'Tailwind',
        'RxJS',
        'NgRx',
      ],
    },
    {
      id: 'backend',
      titleKey: 'stack.categories.backend',
      skills: ['Node.js', 'NestJS', 'Express', 'REST APIs', 'JWT'],
    },
    {
      id: 'db',
      titleKey: 'stack.categories.db',
      skills: ['MySQL', 'MongoDB'],
    },
    {
      id: 'devops',
      titleKey: 'stack.categories.devops',
      skills: ['Docker', 'AWS'],
    },
    {
      id: 'tools',
      titleKey: 'stack.categories.tools',
      skills: ['Git', 'Postman', 'Swagger', 'Figma'],
    },
  ];
}
