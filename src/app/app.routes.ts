import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/redirect/redirect.component').then(m => m.RedirectComponent)
  },
  {
    path: ':lang',
    loadComponent: () => import('./components/cv/cv.component').then(m => m.CvComponent)
  },
  {
    path: '**',
    redirectTo: '/en'
  }
];
