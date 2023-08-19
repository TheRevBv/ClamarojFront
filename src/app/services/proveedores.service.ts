import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Proveedor } from '@models/proveedores';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { Usuario } from '@models/usuarios';

@Injectable({
  providedIn: 'root',
})
export class ProveedoresService {
  public proveedor: Usuario | null = null;
  public header = new HttpHeaders({
    'Content-Type': 'application/json',
    'X-CSRFToken': this.getCookie('csrftoken') || '',
    Authorization:
      'Bearer ' + localStorage.getItem('access_token_proveedor') || '',
  });

  constructor(
    private http: HttpClient,
    private router: Router,
    private cookie: CookieService
  ) {}

  getProveedores(params?: any): Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>('api/proveedores', {
      headers: this.header,
      params: params,
    });
  }

  getProveedor(idProveedor: number): Observable<Proveedor> {
    return this.http.get<Proveedor>(`api/proveedores/${idProveedor}`, {
      headers: this.header,
    });
  }

  addProveedor(proveedor: Proveedor): Observable<Proveedor> {
    return this.http.post<Proveedor>('api/proveedores', proveedor, {
      headers: this.header,
    });
  }

  updateProveedor(proveedor: Proveedor): Observable<Proveedor> {
    return this.http.put<Proveedor>(
      `api/proveedores/${proveedor.idProveedor}`,
      proveedor,
      {
        headers: this.header,
      }
    );
  }

  deleteProveedor(idProveedor: number): Observable<any> {
    return this.http.delete<any>(`api/proveedores/${idProveedor}`, {
      headers: this.header,
    });
  }

  getProfile(): void {
    try {
      this.proveedor = localStorage.getItem('proveedor')
        ? JSON.parse(localStorage.getItem('proveedor') || '')
        : null;
    } catch (e) {
      console.log(e);
    }
  }

  logout() {
    localStorage.removeItem('access_token_proveedor');
    localStorage.removeItem('proveedor');
    localStorage.clear();
    this.proveedor = null;
    this.router.navigate(['portal-proveedores', 'login']);
  }

  getCookie(key: string): string | undefined {
    return this.cookie.get(key);
  }

  setCookie(key: string, value: string): void {
    this.cookie.put(key, value);
  }

  deleteCookie(key: string): void {
    this.cookie.remove(key);
  }
}
