import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Project } from '../projects.model';
import { TechIconComponent } from '../tech-icon/tech-icon.component';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [TranslateModule, TechIconComponent],
  templateUrl: './project-card.component.html',
})
export class ProjectCardComponent {
  @Input({ required: true }) project!: Project;
  @Output() open = new EventEmitter<Project>();

  get cover(): string | null {
    return this.project.images[0] ?? null;
  }

  onOpen(): void {
    this.open.emit(this.project);
  }
}
