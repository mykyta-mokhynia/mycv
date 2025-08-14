import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/ua',
    pathMatch: 'full'
  },
  {
    path: ':lang',
    loadComponent: () => import('./components/cv/cv.component').then(m => m.CvComponent)
  },
  {
    path: '**',
    redirectTo: '/ua'
  }
];
