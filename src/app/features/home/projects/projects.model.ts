export interface TechItem {
  name: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  techStack: TechItem[];
  images: string[];
  metrics: { label: string; value: string }[];
  links: { github?: string; live?: string };
  category: 'fullstack' | 'frontend';
  featured: boolean;
}
