import { Proveedor } from './proveedores';
import { UnidadMedida } from './unidades-medida';

export interface MateriaPrima {
  id?: number;
  codigo: string;
  nombre: string;
  descripcion: string;
  perecedero: number;
  stock: number;
  cantMinima: number;
  cantMaxima: number;
  idUnidadMedida: number;
  // unidad_medida: UnidadMedida;
  precio: number;
  foto: any;
  idProveedor: number;
  // proveedor: Proveedor;
  idStatus: number;
  fechaRegistro?: Date;
  fechaModificacion?: Date;
}
