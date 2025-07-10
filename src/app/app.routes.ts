import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/events-page'),
  },
  {
    path: 'communities',
    loadComponent: () => import('./pages/communities-page'),
  },
  {
    path: 'podcasts',
    loadComponent: () => import('./pages/podcasts-page'),
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found-page'),
  },
];
