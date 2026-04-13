import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layout/shell/shell.component').then((m) => m.ShellComponent),
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadChildren: () =>
          import('./features/home/home.routes').then((m) => m.HOME_ROUTES),
        data: {
          titleKey: 'seo.home_title',
          descriptionKey: 'seo.home_description',
        },
      },
      {
        path: 'about',
        loadChildren: () =>
          import('./features/about/about.routes').then((m) => m.ABOUT_ROUTES),
        data: {
          titleKey: 'seo.about_title',
          descriptionKey: 'seo.about_description',
        },
      },
      {
        path: 'projects',
        loadChildren: () =>
          import('./features/projects/projects.routes').then(
            (m) => m.PROJECTS_ROUTES,
          ),
        data: {
          titleKey: 'seo.projects_title',
          descriptionKey: 'seo.projects_description',
        },
      },
      {
        path: 'contact',
        loadChildren: () =>
          import('./features/contact/contact.routes').then(
            (m) => m.CONTACT_ROUTES,
          ),
        data: {
          titleKey: 'seo.contact_title',
          descriptionKey: 'seo.contact_description',
        },
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
