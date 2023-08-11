export interface Receta {
  idReceta?: number;
  codigo: string;
  cantidad: number; // cantidad de producto
  costo: number;
  idProducto: number;
  idStatus: number;
}
