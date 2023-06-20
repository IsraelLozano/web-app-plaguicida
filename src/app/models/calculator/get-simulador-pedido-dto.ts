export interface GetSimuladorPedidoDto {
  IdPedido: number;
  FechaOperacion: Date;
  ImporteTotal: number;
  Igv: number;
  VentaTotal: number;
  ComisionPercent: number;
  ComisionMonto: number;
  SimuladorPedidoItems: SimuladorPedidoItem[];
}

export interface SimuladorPedidoItem {
  IdPedido: number;
  IdArticulo: number;
  Codigo: string;
  Producto: string;
  CodigoFamilia: string;
  Familia: string;
  Cantidad: number;
  PrecioVvd: number;
  Importe: number;
  Costo: number;
  Mb: number;
  PartImporteTotal: number;
  PesoAsignadoPercent: number;
  ComisionPercent: number;
}
