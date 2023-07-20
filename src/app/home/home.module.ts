import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { NgApexchartsModule } from 'ng-apexcharts';
import { QuillModule } from 'ngx-quill';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DemoMaterialModule } from './../demo-material-module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeInstitucionViews } from './home-institucion/home-institucion.views';
import { AddPedidoComponent } from './add-pedido/add-pedido.component';
import { ViewPedidoComponent } from './view-pedido/view-pedido.component';
import { PedidoListComponent } from './pedido-list/pedido-list.component';
import { GrillaTasaComponent } from './add-pedido/grilla-tasa/grilla-tasa.component';

@NgModule({
  declarations: [
    HomeInstitucionViews,
    AddPedidoComponent,
    ViewPedidoComponent,
    PedidoListComponent,
    GrillaTasaComponent,
  ],
  imports: [
    DemoMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),

    FlexLayoutModule,
    QuillModule.forRoot(),
    NgApexchartsModule,
    PerfectScrollbarModule,
    DragDropModule,
    NgxPaginationModule,
    CommonModule,
    //APLICACION
    HomeRoutingModule,
  ],
})
export class HomeModule {}
