import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proveedor } from '@models/proveedores';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  constructor(private https: HttpClient) { }

  getProveedores(params?: any): Observable<Proveedor[]> {
    return this.https.get<Proveedor[]>('api/proveedores', { params });
  }

  getProveedor(idProveedor: number): Observable<Proveedor> {
    return this.https.get<Proveedor>(`api/proveedores/${idProveedor}`);
  }

  addProveedor(proveedor: Proveedor): Observable<Proveedor> {
    return this.https.post<Proveedor>('api/proveedores', proveedor);
  }

  updateProveedor(proveedor: Proveedor): Observable<Proveedor> {
    return this.https.put<Proveedor>(`api/proveedores/${proveedor.idProveedor}`, proveedor);
  }

  deleteProveedor(idProveedor: number): Observable<Proveedor> {
    return this.https.delete<Proveedor>(`api/proveedores/${idProveedor}`);
  }



}
