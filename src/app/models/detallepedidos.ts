export interface DetallePedido {
  idDetallePedido: number;
  fecha: Date;
  idPedido: number;
  idProducto: number;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
}
