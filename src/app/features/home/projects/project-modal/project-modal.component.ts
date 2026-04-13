import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Project } from '../projects.model';
import { TechIconComponent } from '../tech-icon/tech-icon.component';

@Component({
  selector: 'app-project-modal',
  standalone: true,
  imports: [TranslateModule, TechIconComponent],
  templateUrl: './project-modal.component.html',
})
export class ProjectModalComponent {
  @Input() open = false;
  @Input() project: Project | null = null;
  @Output() closed = new EventEmitter<void>();

  activeImageIndex = 0;

  close(): void {
    this.closed.emit();
  }

  onBackdropClick(): void {
    this.close();
  }

  selectImage(i: number): void {
    this.activeImageIndex = i;
  }

  get activeImage(): string | null {
    if (!this.project) return null;
    return (
      this.project.images[this.activeImageIndex] ??
      this.project.images[0] ??
      null
    );
  }

  get screenCaptionKey(): string {
    if (!this.project) return '';
    const i = this.activeImageIndex + 1;
    return `projects.screens.${this.project.id}.${i}`;
  }
}
