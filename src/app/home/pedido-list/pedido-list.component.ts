import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { finalize } from 'rxjs';
import { LoadingViews } from 'src/app/libs/components/loading/loading.views';
import { GetSimuladorPedidoDto } from 'src/app/models/calculator/get-simulador-pedido-dto';
import { CalculatorService } from 'src/app/services/calculator.service';

@Component({
  selector: 'app-pedido-list',
  templateUrl: './pedido-list.component.html',
  styles: [],
})
export class PedidoListComponent implements AfterViewInit {
  allComplete: boolean = false;

  invoiceList!: MatTableDataSource<GetSimuladorPedidoDto>;

  displayedColumns: string[] = [ 'id', 'billFrom', 'billTo', 'totalCost', 'status'];

  @ViewChild(MatSort) sort: MatSort = Object.create(null);
  @ViewChild(MatPaginator) paginator: MatPaginator = Object.create(null);

  constructor(private invoiceService: CalculatorService, private dialog: MatDialog) {
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

  deleteInvoice(row: number): void {
    if (confirm('Are you sure you want to delete this record ?')) {
      // this.invoiceService.deleteInvoice(row);
      // this.invoiceList.data = this.invoiceList.data.filter((invoice) => invoice.id !== row);
    }
  }
}
