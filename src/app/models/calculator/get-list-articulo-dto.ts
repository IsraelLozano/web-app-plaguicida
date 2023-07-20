
export interface GetArticuloAllDto {
  articulos:     Articulo[];
  tasaComisions: TasaComision[];
}


export interface TasaComision {
  Categoria: string;
  LimiteIni: number;
  LimiteFin: number;
  Peso:      number;
}

export interface Articulo {
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
  PrecioBruto:         number;
  tienePromo:          boolean;
  ListaPrecioItemDets: ListaPrecioItemDet[];
}

export interface ListaPrecioItemDet {
  Iditem:        number;
  DesdeCantidad: number;
  PrecioBruto:   number;
}

export interface RentabilidadComision {
  Porcentaje: number;
  CategoriaRes: number;
  CostoUnit: number;
}
