import { HomeInstitucionViews } from './home-institucion/home-institucion.views';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PedidoListComponent } from './pedido-list/pedido-list.component';
import { ViewPedidoComponent } from './view-pedido/view-pedido.component';
import { AddPedidoComponent } from './add-pedido/add-pedido.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'portalacademico',
        component: PedidoListComponent,
        data: {
          title: 'Portal',
          urls: [
            {
              title: 'Home',
              url: '/home',
            },
            {
              title: 'Portal',
            },
          ],
        },
      },
      {
        path: 'view-pedido/:id',
        component: ViewPedidoComponent,
        data: {
          title: 'Portal',
          urls: [
            {
              title: 'Home',
              url: '/home',
            },
            {
              title: 'Portal',
            },
          ],
        },
      },
      {
        path: 'add-pedido',
        component: AddPedidoComponent,
        data: {
          title: 'Portal',
          urls: [
            {
              title: 'Home',
              url: '/home',
            },
            {
              title: 'Portal',
            },
          ],
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
