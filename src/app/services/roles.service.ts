import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rol } from '@models/rol';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  constructor(private http: HttpClient) {}

  getRoles(): Observable<Rol[]> {
    return this.http.get<Rol[]>('api/Rols');
  }

  getRol(id: number): Observable<Rol> {
    return this.http.get<Rol>(`api/Rols/${id}`);
  }

  addRol(rol: Rol): Observable<Rol> {
    return this.http.post<Rol>('api/Rols', rol);
  }

  updateRol(rol: Rol): Observable<Rol> {
    return this.http.put<Rol>(`api/Rols/${rol.id}`, rol);
  }

  deleteRol(id: number): Observable<Rol> {
    return this.http.delete<Rol>(`api/Rols/${id}`);
  }
}
