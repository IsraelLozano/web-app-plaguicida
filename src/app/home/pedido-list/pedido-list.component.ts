import { HttpEventType, HttpResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { finalize } from 'rxjs';
import { LoadingViews } from 'src/app/libs/components/loading/loading.views';
import { GetSimuladorPedidoDto } from 'src/app/models/calculator/get-simulador-pedido-dto';
import { CalculatorService } from 'src/app/services/calculator.service';
import { ReporteService } from 'src/app/services/reporte.service';

@Component({
  selector: 'app-pedido-list',
  templateUrl: './pedido-list.component.html',
  styles: [],
})
export class PedidoListComponent implements AfterViewInit {
  allComplete: boolean = false;

  invoiceList!: MatTableDataSource<GetSimuladorPedidoDto>;

  displayedColumns: string[] = [ 'id', 'billFrom', 'billTo', 'totalCost', 'status','action'];

  @ViewChild(MatSort) sort: MatSort = Object.create(null);
  @ViewChild(MatPaginator) paginator: MatPaginator = Object.create(null);
  progress!: number;
  message!: string;

  constructor(private invoiceService: CalculatorService, private dialog: MatDialog, private _reporte: ReporteService ) {
    const loading = this.dialog.open(LoadingViews, { disableClose: true });

    const invoiceListData = this.invoiceService
      .GetPedidoAll()
      .pipe(finalize(() => loading.close()))
      .subscribe((resp) => {
        this.invoiceList = new MatTableDataSource(resp);
        this.invoiceList.paginator = this.paginator;
    this.invoiceList.sort = this.sort;
      });
  }

  ngAfterViewInit(): void {

  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // updateAllComplete(): void {
  //   this.allComplete = this.invoiceList != null && this.invoiceList.data.every((t) => t.completed);
  // }
  // someComplete(): any {
  //   return this.invoiceList.data.filter((t) => t.completed).length > 0 && !this.allComplete;
  // }
  // setAll(completed: boolean): void {
  //   this.allComplete = completed;
  //   this.invoiceList.data.forEach((t) => (t.completed = completed));
  // }
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////

  filter(filterValue: string): void {
    this.invoiceList.filter = filterValue.trim().toLowerCase();
  }
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////

  deleteInvoice(id: number): void {

    const loading = this.dialog.open(LoadingViews, { disableClose: true });

    this._reporte    .GetExcelCalculatorById(id    )
    .pipe(finalize(() => loading.close()))
    .subscribe((event: any) => {
      if (event.type === HttpEventType.UploadProgress)
        this.progress = Math.round((100 * event.loaded) / event.total);
      else if (event.type === HttpEventType.Response) {
        this.message = 'descarga realizada';
        this.downloadFile(event, 'onExportExcelCultivo.xlsx');
      }
    });

  }

  private downloadFile = (data: HttpResponse<Blob> | any, fileName: string) => {
    const downloadedFile = new Blob([data.body], { type: data?.body.type });
    const a = document.createElement('a');
    a.setAttribute('style', 'display:none;');
    document.body.appendChild(a);
    a.download = fileName;
    a.href = URL.createObjectURL(downloadedFile);
    a.target = '_blank';
    a.click();
    document.body.removeChild(a);
  };

}
