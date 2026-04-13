import { Project } from './projects.model';

export const PROJECTS: Project[] = [
  {
    id: 'neardental-fleet',
    title: 'projects.neardental.title',
    description: 'projects.neardental.description',
    longDescription: 'projects.neardental.longDescription',
    techStack: [
      { name: 'Angular' },
      { name: 'Node.js' },
      { name: 'MySQL' },
      { name: 'TypeScript' },
      { name: 'AWS' },
      { name: 'MongoDB' },
      { name: 'Tailwind' },
    ],
    images: [
      '/assets/projects/neardental-fleet/login_dashboard.JPG',
      '/assets/projects/neardental-fleet/graficas_reporte_general.JPG',
      '/assets/projects/neardental-fleet/Manual_usuario_dashboard.JPG',
      '/assets/projects/neardental-fleet/metricas_disponibilidad_vehiculos.JPG',
      '/assets/projects/neardental-fleet/reporte_operatividad.JPG',
      '/assets/projects/neardental-fleet/Indicadores_Viajes.JPG',
    ],
    metrics: [
      { label: 'projects.metrics.stack', value: 'Angular + Node + MySQL' },
      { label: 'projects.metrics.role', value: 'Full Stack' },
      {
        label: 'projects.metrics.scope',
        value: 'projects.metricValues.fleet_management',
      },
    ],
    links: {
      github: 'https://gitlab.com/neardental758/dashboard',
    },
    category: 'fullstack',
    featured: true,
  },
  {
    id: 'brain-bike',
    title: 'projects.brainbike.title',
    description: 'projects.brainbike.description',
    longDescription: 'projects.brainbike.longDescription',
    techStack: [
      { name: 'Angular' },
      { name: 'NgRx' },
      { name: 'RxJS' },
      { name: 'Node.js' },
      { name: 'TypeScript' },
    ],
    images: [
      '/assets/projects/brain-bike/login_gopapaya.JPG',
      '/assets/projects/brain-bike/calendario_papaya.JPG',
      '/assets/projects/brain-bike/carrera_envivo.jpeg',
      '/assets/projects/brain-bike/Dash_gopapaya.JPG',
      '/assets/projects/brain-bike/juegos_2.JPG',
      '/assets/projects/brain-bike/manual_gopapaya.JPG',
    ],
    metrics: [
      { label: 'projects.metrics.stack', value: 'Angular + NgRx' },
      {
        label: 'projects.metrics.focus',
        value: 'projects.metricValues.gamification',
      },
    ],
    links: {
      github: 'https://github.com/neardental758-crypto/gopapaya',
    },
    category: 'fullstack',
    featured: true,
  },
  {
    id: 'upc-academic',
    title: 'projects.upc.title',
    description: 'projects.upc.description',
    longDescription: 'projects.upc.longDescription',
    techStack: [
      { name: 'Angular' },
      { name: 'TypeScript' },
      { name: 'Docker' },
      { name: 'Node.js' },
      { name: 'MySQL' },
    ],
    images: [
      '/assets/projects/upc-academic/login.JPG',
      '/assets/projects/upc-academic/Reportes.JPG',
      '/assets/projects/upc-academic/modal_creacion_Asignaturas.JPG',
      '/assets/projects/upc-academic/panel_usuarios.JPG',
      '/assets/projects/upc-academic/lista_de_grupos.JPG',
      '/assets/projects/upc-academic/cargar_lista_usuarios.JPG',
    ],
    metrics: [
      { label: 'projects.metrics.stack', value: 'Angular + Docker' },
      {
        label: 'projects.metrics.scope',
        value: 'projects.metricValues.academic_system',
      },
    ],
    links: {
      github:
        'https://github.com/AndresOsorio0710/net-Auth/tree/master/ra_software',
    },
    category: 'frontend',
    featured: false,
  },
];
