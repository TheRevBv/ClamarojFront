import { Proveedor } from "./proveedores";
import { UnidadMedida } from "./unidades-medida";

export interface MateriaPrima {
    id?: number;
    codigo: string;
    nombre: string;
    descripcion: string;
    perecedero: number;
    stock: number;
    cant_minima: number;
    cant_maxima:number;
    unidad_medida: UnidadMedida;
    precio: number;
    foto: any;
    proveedor: Proveedor;
    idStatus: number;
    fechaRegistro: Date;
    fechaModificacion: Date;
}