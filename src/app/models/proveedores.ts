import { Usuario } from '@models/usuarios';

export interface Proveedor {
  idProveedor: number;
  direccion: string;
  telefono: string;
  rfc: string;
  razonSocial: string;
  usuario: Usuario;
}
