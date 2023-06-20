export interface GetListArticuloDto {
  IdEmpresa: number;
  IdArticulo: number;
  CodArticulo: string;
  NomArticulo: string;
  NomArticuloEng: null | string;
  NomArticuloLargo: string;
  NomCorto: string;
  IndCodBarra: boolean | null;
  CodBarra: string;
  ArticuloCategorium: ArticuloCategorium;
  ListaPrecioItems: ListaPrecioItem[];
  RentabilidadComisions: RentabilidadComision[];
}

export interface ArticuloCategorium {
  NombreCategoria: string;
}

export interface ListaPrecioItem {
  IdListaPrecio: number;
  PrecioVenta: number;
}

export interface RentabilidadComision {
  Porcentaje: number;
  CategoriaRes: number;
  CostoUnit: number;
}