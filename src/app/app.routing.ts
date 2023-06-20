import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { AppBlankComponent } from './layouts/blank/blank.component';
import { SigninRedirectCallbackComponent } from './libs/components/signin-redirect-callback/signin-redirect-callback.component';
import { SignoutRedirectCallbackComponent } from './libs/components/signout-redirect-callback/signout-redirect-callback.component';
import { UnauthorizedViews } from './authentication/unauthorized/unauthorized.views';
import { AuthGuardService } from './libs/guards/auth-guard.service';

export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: '/home/portalacademico',
    pathMatch: 'full',
  },
  {
    path: '',
    component: FullComponent,
    children: [
      // {
      //   path: 'home',
      //   redirectTo: '/home/portalacademico',
      //   // pathMatch: 'full',
      //   // canActivate: [AuthGuardService],
      // },
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
        // canActivate: [AuthGuardService],
      },
      { path: 'unauthorized', component: UnauthorizedViews },
    ],
  },
  { path: 'signin-callback', component: SigninRedirectCallbackComponent },
  { path: 'signout-callback', component: SignoutRedirectCallbackComponent },
  {
    path: '',
    component: AppBlankComponent,
    children: [
      {
        path: 'authentication',
        loadChildren: () =>
          import('./authentication/authentication.module').then((m) => m.AuthenticationModule),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'authentication/404',
  },
];
