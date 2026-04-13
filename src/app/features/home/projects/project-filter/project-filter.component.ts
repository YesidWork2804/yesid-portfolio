import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

export type ProjectCategoryFilter = 'all' | 'fullstack' | 'frontend';

@Component({
  selector: 'app-project-filter',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './project-filter.component.html',
})
export class ProjectFilterComponent {
  @Input() value: ProjectCategoryFilter = 'all';
  @Output() valueChange = new EventEmitter<ProjectCategoryFilter>();

  readonly filters: Array<{ id: ProjectCategoryFilter; labelKey: string }> = [
    { id: 'all', labelKey: 'projects.filters.all' },
    { id: 'fullstack', labelKey: 'projects.filters.fullstack' },
    { id: 'frontend', labelKey: 'projects.filters.frontend' },
  ];

  set(id: ProjectCategoryFilter): void {
    this.valueChange.emit(id);
  }

  classes(active: boolean): string {
    const base =
      'relative px-3 py-1.5 text-xs sm:text-sm rounded-full border ui-transition overflow-hidden';

    if (active) {
      return [
        base,
        'border-primary/30 text-primary bg-primary/10 dark:bg-primary/15',
      ].join(' ');
    }

    return [
      base,
      'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-surface-100',
    ].join(' ');
  }
}
