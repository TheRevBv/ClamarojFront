export interface Carrito {
  idCarrito: number;
  idCliente: number;
  idProducto: number;
  cliente?: string;
  producto?: string;
  cantidad: number;
  fechaRegistro: string;
  fechaModificacion: string;
}
