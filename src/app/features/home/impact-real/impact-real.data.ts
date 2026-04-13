export type ImpactMetric = {
  value: number;
  prefix?: string;
  suffix?: string;
  icon: 'building' | 'truck' | 'calendar';
  labelKey: string;
};

export type EvidenceItem = {
  src: string;
  captionKey: string;
};

export type UseCaseMilestone = {
  dateKey: string;
  titleKey: string;
  descriptionKey: string;
  tech: string[];
};

export const IMPACT_METRICS: ImpactMetric[] = [
  {
    value: 30,
    prefix: '+',
    icon: 'building',
    labelKey: 'impact.metrics.companies',
  },
  {
    value: 800,
    prefix: '+',
    icon: 'truck',
    labelKey: 'impact.metrics.vehicles',
  },
  {
    value: 3,
    prefix: '+',
    icon: 'calendar',
    labelKey: 'impact.metrics.years',
  },
];

export const EVIDENCE_GALLERY: EvidenceItem[] = [
  {
    src: '/assets/evidence/sesion_153_1769122730482.jpg',
    captionKey: 'impact.gallery.caption_1',
  },
  {
    src: '/assets/evidence/sesion_167_1771448991995.jpg',
    captionKey: 'impact.gallery.caption_2',
  },
  {
    src: '/assets/evidence/sesion_167_1771448986839.jpg',
    captionKey: 'impact.gallery.caption_3',
  },
  {
    src: '/assets/evidence/sesion_167_1771448997507.jpg',
    captionKey: 'impact.gallery.caption_4',
  },
  {
    src: '/assets/evidence/sesion_185_1774445169435.jpg',
    captionKey: 'impact.gallery.caption_5',
  },
  {
    src: '/assets/evidence/sesion_147_1769183626766.jpg',
    captionKey: 'impact.gallery.caption_6',
  },
];

export const USE_CASE_MILESTONES: UseCaseMilestone[] = [
  {
    dateKey: 'impact.timeline.m1.date',
    titleKey: 'impact.timeline.m1.title',
    descriptionKey: 'impact.timeline.m1.desc',
    tech: ['Angular', 'Node.js', 'MySQL'],
  },
  {
    dateKey: 'impact.timeline.m2.date',
    titleKey: 'impact.timeline.m2.title',
    descriptionKey: 'impact.timeline.m2.desc',
    tech: ['AWS', 'Docker'],
  },
  {
    dateKey: 'impact.timeline.m3.date',
    titleKey: 'impact.timeline.m3.title',
    descriptionKey: 'impact.timeline.m3.desc',
    tech: ['RxJS', 'NgRx'],
  },
];
