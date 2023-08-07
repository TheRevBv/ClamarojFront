import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Proveedor } from '@models/proveedores';

@Injectable({
  providedIn: 'root',
})
export class ProveedoresService {
  constructor(private http: HttpClient) {}

  getProveedores(params?: any): Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>('api/proveedores', { params });
  }

  getProveedor(idProveedor: number): Observable<Proveedor> {
    return this.http.get<Proveedor>(`api/proveedores/${idProveedor}`);
  }

  addProveedor(proveedor: Proveedor): Observable<Proveedor> {
    return this.http.post<Proveedor>('api/proveedores', proveedor);
  }

  updateProveedor(proveedor: Proveedor): Observable<Proveedor> {
    return this.http.put<Proveedor>(
      `api/proveedores/${proveedor.idProveedor}`,
      proveedor
    );
  }

  deleteProveedor(idProveedor: number): Observable<any> {
    return this.http.delete<any>(`api/proveedores/${idProveedor}`);
  }
}
