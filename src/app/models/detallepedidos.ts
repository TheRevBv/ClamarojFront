export interface DetallePedido {
  idDetallePedido: number;
  fecha: Date;
  idPedido: number;
  idProducto: number;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
}

export interface DetallePedidoDto {
  idDetallePedido: number;
  fecha: Date;
  idPedido: number;
  idProducto: number;
  codigoProducto: string;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
}
