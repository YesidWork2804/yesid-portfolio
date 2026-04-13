import {
  Component,
  AfterViewInit,
  ElementRef,
  OnDestroy,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {
  ScrollSpyService,
  SectionId,
} from '../../core/services/scroll-spy.service';
import { ViewportAnimateDirective } from '../../shared/directives/viewport-animate.directive';
import { AppButtonComponent } from '../../shared/components/button/button.component';
import { AnimatedCounterComponent } from '../../shared/components/animated-counter/animated-counter.component';
import { SectionWrapperComponent } from '../../shared/components/section-wrapper/section-wrapper.component';
import { PROJECTS } from './projects/projects.data';
import { Project } from './projects/projects.model';
import {
  ProjectCategoryFilter,
  ProjectFilterComponent,
} from './projects/project-filter/project-filter.component';
import { ProjectCardComponent } from './projects/project-card/project-card.component';
import { ProjectModalComponent } from './projects/project-modal/project-modal.component';
import {
  EVIDENCE_GALLERY,
  IMPACT_METRICS,
  USE_CASE_MILESTONES,
} from './impact-real/impact-real.data';
import { ImpactMetricsComponent } from './impact-real/impact-metrics/impact-metrics.component';
import { EvidenceGalleryComponent } from './impact-real/evidence-gallery/evidence-gallery.component';
import { LightboxComponent } from './impact-real/lightbox/lightbox.component';
import { UseCaseTimelineComponent } from './impact-real/use-case-timeline/use-case-timeline.component';
import { AboutSectionComponent } from './about-section/about-section.component';
import { StackSectionComponent } from './stack-section/stack-section.component';
import { ExperienceSectionComponent } from './experience-section/experience-section.component';
import { ContactSectionComponent } from './contact-section/contact-section.component';
import { CoursesSectionComponent } from './courses-section/courses-section.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    TranslateModule,
    ViewportAnimateDirective,
    AppButtonComponent,
    AnimatedCounterComponent,
    SectionWrapperComponent,
    AboutSectionComponent,
    StackSectionComponent,
    ProjectFilterComponent,
    ProjectCardComponent,
    ProjectModalComponent,
    ImpactMetricsComponent,
    EvidenceGalleryComponent,
    LightboxComponent,
    UseCaseTimelineComponent,
    ExperienceSectionComponent,
    ContactSectionComponent,
    CoursesSectionComponent,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly router = inject(Router);
  private readonly translate = inject(TranslateService);
  private readonly scrollSpy = inject(ScrollSpyService);

  typewriterText = '';

  readonly projects = PROJECTS;
  projectFilter: ProjectCategoryFilter = 'all';
  selectedProject: Project | null = null;

  readonly impactMetrics = IMPACT_METRICS;
  readonly evidenceGallery = EVIDENCE_GALLERY;
  readonly milestones = USE_CASE_MILESTONES;

  lightboxOpen = false;
  lightboxIndex = 0;

  private observer: IntersectionObserver | null = null;
  private typeTimer: number | null = null;
  private typeTimeout: number | null = null;
  private phraseIndex = 0;
  private charIndex = 0;
  private deleting = false;

  ngAfterViewInit(): void {
    this.setupScrollSpy();
    this.startTypewriter();
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();

    if (this.typeTimer !== null) {
      window.clearInterval(this.typeTimer);
    }

    if (this.typeTimeout !== null) {
      window.clearTimeout(this.typeTimeout);
    }
  }

  private setupScrollSpy(): void {
    const root = this.host.nativeElement;
    const nodeList = root.querySelectorAll(
      '[data-section]',
    ) as NodeListOf<HTMLElement>;
    const sections = Array.from(nodeList);

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    this.observer = new IntersectionObserver(
      (entries) => {
        // Pick the most visible intersecting section.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0),
          );

        const top = visible[0];
        if (!top) return;

        const id = (top.target as HTMLElement).dataset['section'] as
          | SectionId
          | undefined;
        if (!id) return;
        this.scrollSpy.setActiveSection(id);
      },
      {
        root: null,
        threshold: prefersReducedMotion ? [0.25] : [0.25, 0.5, 0.75],
      },
    );

    sections.forEach((s: HTMLElement) => this.observer?.observe(s));
  }

  private startTypewriter(): void {
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const smallScreen =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(max-width: 640px)').matches;
    let phrases = this.getTypewriterPhrases();

    if (reduced || smallScreen) {
      this.typewriterText = phrases[0] ?? '';
      return;
    }

    const tick = () => {
      phrases = this.getTypewriterPhrases();
      const current = phrases[this.phraseIndex] ?? '';
      const nextText = current.slice(0, this.charIndex);
      this.typewriterText = nextText;

      if (!this.deleting) {
        if (this.charIndex < current.length) {
          this.charIndex++;
          return;
        }

        this.deleting = true;
        this.typeTimeout = window.setTimeout(() => {}, 700);
        return;
      }

      if (this.charIndex > 0) {
        this.charIndex--;
        return;
      }

      this.deleting = false;
      this.phraseIndex = (this.phraseIndex + 1) % Math.max(1, phrases.length);
    };

    this.translate.onLangChange.subscribe(() => {
      // Restart to pick the translated phrases.
      phrases = this.getTypewriterPhrases();
      this.phraseIndex = 0;
      this.charIndex = 0;
      this.deleting = false;
    });

    this.typeTimer = window.setInterval(tick, 48);
  }

  private getTypewriterPhrases(): string[] {
    return [
      this.translate.instant('hero.role_1'),
      this.translate.instant('hero.role_2'),
    ].filter(Boolean);
  }

  async goTo(fragment: string): Promise<void> {
    await this.router.navigate(['/'], { fragment });
  }

  get filteredProjects(): Project[] {
    if (this.projectFilter === 'all') return this.projects;
    return this.projects.filter((p) => p.category === this.projectFilter);
  }

  openProject(project: Project): void {
    this.selectedProject = project;
  }

  closeProject(): void {
    this.selectedProject = null;
  }

  openLightbox(index: number): void {
    this.lightboxIndex = index;
    this.lightboxOpen = true;
  }

  closeLightbox(): void {
    this.lightboxOpen = false;
  }
}
