import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type SectionId =
  | 'home'
  | 'about'
  | 'stack'
  | 'projects'
  | 'impact'
  | 'experience'
  | 'courses'
  | 'contact';

@Injectable({ providedIn: 'root' })
export class ScrollSpyService {
  private readonly activeSectionSubject = new BehaviorSubject<SectionId>(
    'home',
  );
  readonly activeSection$ = this.activeSectionSubject.asObservable();

  get activeSection(): SectionId {
    return this.activeSectionSubject.value;
  }

  setActiveSection(id: SectionId): void {
    this.activeSectionSubject.next(id);
  }
}
