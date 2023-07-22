export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  password: string;
  password_confirmation?: string;
  foto: string;
  fechaNacimiento: string;
  idStatus: number;
  idRoles?: number[];
}
