import { tokenGuard } from '@core/token/guards/token.guard'
import { AUTH_ROUTES } from '@features/auth/auth.routes'
import { LayoutComponent } from '@shared/third-party/layouts/layout/layout.component'
import { VexRoutes } from '@vex/interfaces/vex-route.interface'

export const routes: VexRoutes = [
  {
    path: 'auth',
    children: [
      ...AUTH_ROUTES,
      {
        path: '**',
        loadComponent: () => import('./core/error/pages').then(m => m.Error404Component)
      },
    ],
  },
  {
    path: '',
    component: LayoutComponent,
    // ACTIVAR PARA LOGIN TOKEN 
    // canActivate: [tokenGuard],
    children: [
      {
        path: 'utec',
        children: [
          {
            path: 'analisis-genetico',
            loadChildren: () => import('./features/maintenance/analisisGenetico/analisis-genetico.routes').then(x => x.ANALISIS_GENETICO_ROUTES),
          },
        ],
      },
      {
        path: '**',
        loadComponent: () => import('./core/error/pages').then(m => m.Error404Component),
      },
    ],
  },
]
