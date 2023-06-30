import { Component, OnInit } from '@angular/core';
import {
  UntypedFormGroup,
  UntypedFormArray,
  UntypedFormBuilder,
  Validators,
  FormControl,
  FormGroup,
  FormArray,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { date } from 'ngx-custom-validators/src/app/date/validator';
import { Observable, finalize, last, map, startWith } from 'rxjs';
import { LoadingViews } from 'src/app/libs/components/loading/loading.views';
import {
  GetListArticuloDto,
  ListaPrecioItem,
  RentabilidadComision,
} from 'src/app/models/calculator/get-list-articulo-dto';
import {
  GetSimuladorPedidoDto,
  SimuladorPedidoItem,
} from 'src/app/models/calculator/get-simulador-pedido-dto';
import { CalculatorService } from 'src/app/services/calculator.service';
import { DialogService } from 'src/app/shared/dialog/dialog.service';

@Component({
  selector: 'app-add-pedido',
  templateUrl: './add-pedido.component.html',
  styles: [],
})
export class AddPedidoComponent implements OnInit {
  addForm: UntypedFormGroup;
  rows: UntypedFormArray;
  invoice!: GetSimuladorPedidoDto;
  dataArticulos!: GetListArticuloDto[];
  PedidosItems: SimuladorPedidoItem[] = [];
  ///////////////////////////////////////////////////////////
  subTotal = 0;
  totalComision = 0.0;
  totalComisionDolares = 0.0;
  vat = 0;
  grandTotal = 0;
  idPedido: number;
  PrecioReal!: number;

  _tipoGab: number = 0;
  _tipoC: number = 0;
  _tipoD: number = 0;

  mitexto!: string;

  //Autocomplete

  constructor(
    private fb: UntypedFormBuilder,
    // private invoiceService: ServiceinvoiceService,
    private router: Router,
    public dialog: MatDialog,
    private invoiceService: CalculatorService,
    private _dialogService: DialogService,
  ) {
    this.idPedido = 1;
    // this.invoice.IdPedido =
    //   Math.max.apply(
    //     Math,
    //     this.invoiceService.getInvoiceList().map(function (o: any) {
    //       return o.id;
    //     }),
    //   ) + 1;

    this.GetArticulos();
    ///////////////////////////////////////////////////////////

    this.addForm = this.fb.group({});

    this.rows = this.fb.array([]);
    this.addForm.addControl('rows', this.rows);
  }
  ngOnInit(): void {

  }

  filtrando(name: any) {
    const texto = name?.target?.value;
    this.filterStates(texto);
  }

  filterStates(name: string) {
    const filtrado =
      (name &&
        this.dataArticulos?.filter((state) =>
          state.NomArticulo.toLowerCase().includes(name?.toLowerCase()),
        )) ||
      this.dataArticulos;
    return filtrado;
  }

  //For AutoComplete
  myControl2 = new FormControl<string | any>('');
  filteredOptions: Observable<any[]> | undefined;

  displayFn(user?: GetListArticuloDto): string | undefined {
    return user ? user.NomArticulo : undefined;
  }

  _filter(name: string) {
    const filterValue = name.toLowerCase();
    return this.dataArticulos.filter((option) =>
      option.NomArticulo.toLowerCase().includes(filterValue),
    );
  }
  ////////////////////////////////////////////////////////////////////////////////////
  onAddRow(): void {
    this.rows.push(this.createItemFormGroup());
  }

  onRemoveRow(rowIndex: number): void {
    const totalCostOfItem =
      this.addForm.get('rows')?.value[rowIndex].unitPrice *
      this.addForm.get('rows')?.value[rowIndex].units;

    this.subTotal = this.subTotal - totalCostOfItem;
    this.vat = this.subTotal / 10;
    this.grandTotal = this.subTotal + this.vat;
    this.rows.removeAt(rowIndex);
    this.totalComision = 0.0;

    const getRows = this.addForm.get('rows') as FormArray;

    for (const iterator of getRows.controls) {
      const fg = iterator as FormGroup;
      const { itemName, unitPrice, units } = fg.value;
      const articulo = itemName as GetListArticuloDto;
      const participacion = (units * unitPrice) / this.subTotal;
      const comision = participacion * (articulo?.RentabilidadComisions[0]?.CategoriaRes / 100.0);
      fg.patchValue({
        participacion: (participacion * 100.0).toFixed(3),
        comision: (comision * 100.0).toFixed(3),
        // rentabilidad: articulo.RentabilidadComisions[0]?.Porcentaje,
      });

      this.totalComision += comision * 100.0;
    }

    this.totalComisionDolares = (this.totalComision / 100.0) * this.subTotal;
  }

  numRegex = /^-?\d*[.,]?\d{0,2}$/;

  createItemFormGroup(): UntypedFormGroup {
    const control =  this.fb.group({
      itemName: [''],
      unitPrice: ['0',[Validators.required, Validators.pattern(this.numRegex)]],
      units: ['', Validators.required],
      itemTotal: [0],
      participacion: [0],
      rentabilidad: [0.0],
      comision: [0],
    });

    this.filteredOptions = control.get('itemName')?.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const name = typeof value === 'string' ? value : value?.NomArticulo;
        return name ? this._filter(name as string) : this.dataArticulos?.slice();
      }),
    );

    return control;

  }

  itemsChanged(): void {
    let total: number = 0;

    // tslint:disable-next-line - Disables all
    for (let t = 0; t < (<UntypedFormArray>this.addForm.get('rows')).length; t++) {
      if (
        this.addForm.get('rows')?.value[t].unitPrice !== '' &&
        this.addForm.get('rows')?.value[t].units
      ) {
        total =
          this.addForm.get('rows')?.value[t].unitPrice * this.addForm.get('rows')?.value[t].units +
          total;
      }
    }

    this.subTotal = total;
    this.vat = this.subTotal / 10;
    this.grandTotal = this.subTotal + this.vat;
    this.totalComision = 0.0;

    const getRows = this.addForm.get('rows') as FormArray;

    for (const iterator of getRows.controls) {
      const fg = iterator as FormGroup;
      const { itemName, unitPrice, units } = fg.value;
      const articulo = itemName as GetListArticuloDto;
      const participacion = (units * unitPrice) / this.subTotal;

      const comision = participacion * (articulo?.RentabilidadComisions[0]?.CategoriaRes / 100.0);

      const rentabilidadMargen = ((units * unitPrice) - (articulo?.RentabilidadComisions[0]?.CostoUnit * units)) / (units * unitPrice);


      fg.patchValue({
        participacion: (participacion * 100.0).toFixed(3),
        comision: (comision * 100.0).toFixed(3),
        rentabilidad: (rentabilidadMargen * 100).toFixed(2),
      });

      this.totalComision += comision * 100.0;
    }

    this.totalComisionDolares = (this.totalComision / 100.0) * total;
  }

  onSelectionChange(row: any, myRow: FormGroup) {
    const { ListaPrecioItems, RentabilidadComisions } = row.option.value;
    const precios = ListaPrecioItems[0] as ListaPrecioItem;
    const rentabilidad = RentabilidadComisions[0] as RentabilidadComision;

    myRow.patchValue({
      unitPrice: precios.PrecioVenta,
      rentabilidad: rentabilidad.Porcentaje,
    });
  }
  ////////////////////////////////////////////////////////////////////
  saveDetail(): void {
    this.PedidosItems = [];

    const getRows = this.addForm.get('rows') as FormArray;
    for (const iterator of getRows.controls) {
      const fg = iterator as FormGroup;
      const { itemName, unitPrice, units, participacion, comision } = fg.value;
      const articulo = itemName as GetListArticuloDto;

      const o: SimuladorPedidoItem = {
        IdPedido: 0,
        IdArticulo: articulo.IdArticulo,
        Codigo: articulo.CodArticulo,
        Producto: articulo.NomArticulo,
        CodigoFamilia: '',
        Familia: articulo.ArticuloCategorium.NombreCategoria,
        Cantidad: units,
        PrecioVvd: unitPrice,
        Importe: units * unitPrice,
        Costo: articulo?.RentabilidadComisions[0]?.CostoUnit,
        Mb: articulo?.RentabilidadComisions[0]?.Porcentaje,
        PartImporteTotal: participacion,
        PesoAsignadoPercent: articulo?.RentabilidadComisions[0]?.CategoriaRes,
        ComisionPercent: comision,
      };
      this.PedidosItems.push(o);
    }

    const pedido: GetSimuladorPedidoDto = {
      IdPedido: 0,
      FechaOperacion: new Date(),
      ImporteTotal: this.subTotal,
      Igv: 0,
      VentaTotal: this.subTotal,
      ComisionPercent: this.totalComision,
      ComisionMonto: this.totalComisionDolares,
      SimuladorPedidoItems: this.PedidosItems,
    };
    console.log('mis items', pedido);
    //Enviar a grabar...

    this._dialogService
      .confirm({
        title: 'Confirmación',
        message: '¿Desea grabar la información?',
        buttonOk: {
          text: 'ACEPTAR',
        },
        buttonCancel: {
          text: 'CANCELAR',
        },
      })
      .subscribe((result: boolean | undefined) => {
        if (result) {
          // Grabando
          const loading = this.dialog.open(LoadingViews, { disableClose: true });
          this.invoiceService
            .AddOrEditPedido(pedido)
            .pipe(finalize(() => loading.close()))
            .subscribe((resultado) => {
              if (resultado) {
                this._dialogService.info({
                  title: 'Confirmación',
                  message: 'La información fue grabada correctamente.',
                  button: {
                    text: 'CERRAR',
                  },
                });
                this.router.navigate(['/home/portalacademico']);
              }
            });
        }
      });
  }

  GetArticulos() {
    const loading = this.dialog.open(LoadingViews, { disableClose: true });

    this.invoiceService
      .GetArticuloAll('a')
      .pipe(finalize(() => loading.close()))
      .subscribe((resp) => {
        this.dataArticulos = resp;
      });
  }
}
