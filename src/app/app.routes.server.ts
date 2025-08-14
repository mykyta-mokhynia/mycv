import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: ':lang',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => [
      { lang: 'ua' },
      { lang: 'en' }
    ]
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
