import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetSimuladorPedidoDto } from 'src/app/models/calculator/get-simulador-pedido-dto';
import { CalculatorService } from 'src/app/services/calculator.service';

@Component({
  selector: 'app-view-pedido',
  templateUrl: './view-pedido.component.html',
  styles: [
  ]
})
export class ViewPedidoComponent {

  id: any;
  invoiceDetail!: GetSimuladorPedidoDto;
  displayedColumns: string[] = ['itemName', 'unitPrice', 'unit', 'total'];

  constructor(activatedRouter: ActivatedRoute, private invoiceService: CalculatorService) {
    this.id = activatedRouter.snapshot.paramMap.get('id');
    // this.invoiceDetail = this.invoiceService.GetPedidoAll().filter((x) => x?.id === +this.id)[0];
  }

}
