import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';
import { LoadingViews } from 'src/app/libs/components/loading/loading.views';
import { GetSimuladorPedidoDto } from 'src/app/models/calculator/get-simulador-pedido-dto';
import { CalculatorService } from 'src/app/services/calculator.service';

@Component({
  selector: 'app-view-pedido',
  templateUrl: './view-pedido.component.html',
  styles: [],
})
export class ViewPedidoComponent {
  id: any;
  invoiceDetail!: GetSimuladorPedidoDto;
  displayedColumns: string[] = ['itemName', 'unitPrice', 'unit', 'total',
'PrecioVvd',
'Importe',
'Mb',
'PesoAsignadoPercent',
'ComisionPercent'
];

  constructor(activatedRouter: ActivatedRoute, private invoiceService: CalculatorService,private dialog: MatDialog) {
    this.id = activatedRouter.snapshot.paramMap.get('id');
    // this.invoiceDetail = this.invoiceService.GetPedidoAll().filter((x) => x?.id === +this.id)[0];

    this.GetData(this.id)
  }
  GetData(id: any) {
    const loading = this.dialog.open(LoadingViews, { disableClose: true });

    this.invoiceService
      .GetPedidoById(id)
      .pipe(finalize(() => loading.close()))
      .subscribe((resp) => {
        this.invoiceDetail = resp
       });

  }

}
