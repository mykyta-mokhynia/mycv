import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: ':lang',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => [
      { lang: 'en' },
      { lang: 'ua' }
    ]
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
