import { Component, inject } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ViewportAnimateDirective } from '../../../shared/directives/viewport-animate.directive';

type ExperienceItem = {
  companyKey: string;
  roleKey: string;
  periodKey: string;
  bulletsKeys: string[];
};

@Component({
  selector: 'app-experience-section',
  standalone: true,
  imports: [TranslateModule, ViewportAnimateDirective],
  templateUrl: './experience-section.component.html',
})
export class ExperienceSectionComponent {
  private readonly translate = inject(TranslateService);

  // Total experience is computed from the two items below.
  private get totalMonths(): number {
    return (
      this.diffMonths(new Date(2022, 5, 1), new Date(2023, 0, 1)) +
      this.diffMonths(new Date(2023, 2, 1), new Date())
    );
  }

  get totalExperienceLabel(): string {
    const months = Math.max(0, this.totalMonths);
    const years = Math.floor(months / 12);
    const rem = months % 12;

    if (years > 0 && rem > 0) {
      return this.translate.instant('experience.total_years_months', {
        years,
        months: rem,
      });
    }

    if (years > 0) {
      return this.translate.instant('experience.total_years', { years });
    }

    return this.translate.instant('experience.total_months', { months });
  }

  readonly items: ExperienceItem[] = [
    {
      companyKey: 'experience.items.neardental.company',
      roleKey: 'experience.items.neardental.role',
      periodKey: 'experience.items.neardental.period',
      bulletsKeys: [
        'experience.items.neardental.b1',
        'experience.items.neardental.b2',
        'experience.items.neardental.b3',
      ],
    },
    {
      companyKey: 'experience.items.upc.company',
      roleKey: 'experience.items.upc.role',
      periodKey: 'experience.items.upc.period',
      bulletsKeys: ['experience.items.upc.b1', 'experience.items.upc.b2'],
    },
  ];

  private diffMonths(from: Date, to: Date): number {
    const start = new Date(from.getFullYear(), from.getMonth(), 1);
    const end = new Date(to.getFullYear(), to.getMonth(), 1);
    return Math.max(
      0,
      (end.getFullYear() - start.getFullYear()) * 12 +
        (end.getMonth() - start.getMonth()),
    );
  }
}
