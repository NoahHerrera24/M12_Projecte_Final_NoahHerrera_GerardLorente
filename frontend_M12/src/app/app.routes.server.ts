import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'equip-edit/:id',
    renderMode: RenderMode.Server
  },
  {
    path: 'torneig-edit/:id',
    renderMode: RenderMode.Server
  },
  {
    path: 'torneig-declare-winner/:id',
    renderMode: RenderMode.Server
  },
  {
    path: 'ticket-queixa-edit/:id',
    renderMode: RenderMode.Server
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
