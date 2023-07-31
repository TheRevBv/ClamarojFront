import { Usuario } from '@models/usuarios';

export interface Cliente {
  idCliente?: number;
  direccion?: string;
  telefono?: string;
  rfc?: string;
  usuario?: Usuario;
}
