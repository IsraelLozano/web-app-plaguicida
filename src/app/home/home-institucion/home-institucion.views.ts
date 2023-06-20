import { SessionService } from 'src/app/libs/services/session.service';
import { Component, OnInit } from '@angular/core';
import { Institucion } from 'src/app/shared/menu-items/GetDtoUser';

@Component({
  selector: 'app-home-institucion',
  templateUrl: './home-institucion.views.html',
  styles: [],
})
export class HomeInstitucionViews implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }


  // allComplete: boolean = false;

  // invoiceList: MatTableDataSource<InvoiceList>;
  // displayedColumns: string[] = ['chk', 'id', 'billFrom', 'billTo', 'totalCost', 'status', 'action'];

  // @ViewChild(MatSort) sort: MatSort = Object.create(null);
  // @ViewChild(MatPaginator) paginator: MatPaginator = Object.create(null);

  // constructor(private invoiceService: ServiceinvoiceService) {
  //   const invoiceListData = this.invoiceService.getInvoiceList();
  //   this.invoiceList = new MatTableDataSource(invoiceListData);
  // }

  // ngAfterViewInit(): void {
  //   this.invoiceList.paginator = this.paginator;
  //   this.invoiceList.sort = this.sort;
  // }

  // /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
  // /////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // filter(filterValue: string): void {
  //   this.invoiceList.filter = filterValue.trim().toLowerCase();
  // }
  // ///////////////////////////////////////////////////////////////////////////////////////////////////////////

  // deleteInvoice(row: number): void {
  //   if (confirm('Are you sure you want to delete this record ?')) {
  //     this.invoiceService.deleteInvoice(row);
  //     this.invoiceList.data = this.invoiceList.data.filter((invoice) => invoice.id !== row);
  //   }
  // }
}
