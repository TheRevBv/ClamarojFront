export interface Producto {
    idProducto?: number;
    codigo: string;
    nombre: string;
    descripcion: string;
    precio: number;
    foto: any;
    merma: number;
    idStatus: number;
    fechaRegistro: Date;
    fechaModificacion: Date;
}