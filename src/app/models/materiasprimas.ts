//import { Proveedor } from '@models/proveedor';
//import { UnidadMedida } from '@models/unidadmedida';

export interface MateriaPrima {
    id?: number;
    codigo: string;
    nombre: string;
    descripcion: string;
    perecedero: number;
    stock: number;
    cant_minima: number;
    cant_maxima:number;
    unidad_medida?: number; //Medida
    precio: number;
    foto: any;
    proveedor?: number; //Proveedor
    idStatus: number;
    fechaRegistro: Date;
    fechaModificacion: Date;
}