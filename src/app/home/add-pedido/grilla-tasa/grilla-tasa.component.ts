import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TasaComision } from 'src/app/models/calculator/get-list-articulo-dto';

@Component({
  selector: 'app-grilla-tasa',
  templateUrl: './grilla-tasa.component.html',
  styleUrls:["./grilla-tasa.component.scss"]
})
export class GrillaTasaComponent implements OnInit {

  cursosList!: MatTableDataSource<TasaComision>;

  displayedColumns: string[] = [
    'Categoria',
    'LimiteIni',
    'LimiteFin',
    'Peso',
  ];

  @Input() set setData(value: TasaComision[]) {
    this.cursosList = new MatTableDataSource(value);
  }

  constructor() {}

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

}
