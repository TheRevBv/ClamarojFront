import { Rol } from '@models/rol';

export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  password: string;
  password_confirmation?: string;
  foto: any; // Blob | File;
  fechaNacimiento: Date;
  fechaRegistro: Date;
  idStatus: number;
  idRoles?: Rol[];
}
