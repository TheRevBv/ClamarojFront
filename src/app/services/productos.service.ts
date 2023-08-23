import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
// import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Producto } from '@app/models/productos';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  public producto: Producto | null = null;
  public header = new HttpHeaders({
    'Content-Type': 'application/json',
    'X-CSRFToken': this.getCookie('csrftoken') || '',
    Authorization: 'Bearer ' + localStorage.getItem('access_token') || '',
  });

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router,
    private cookie: CookieService
  ) {}

  getProductos(params?: any): Observable<Producto[]> {
    return this.http.get<Producto[]>(`/api/Productos`, {
      headers: this.header,
      params: new HttpParams({
        fromObject: params,
      }),
    });
  }

  getProducto(id: number): Observable<Producto> {
    return this.http.get<Producto>(`/api/Productos/${id}`, {
      headers: this.header,
    });
  }

  createProducto(data: Producto): Observable<any> {
    return this.http.post<Producto>(`/api/Productos`, data, {
      headers: this.header,
    });
  }

  updateProducto(data: Producto): Observable<Producto> {
    return this.http.put<Producto>(`/api/Productos/${data.idProducto}`, data, {
      headers: this.header,
    });
  }

  deleteProducto(id: number): Observable<Producto> {
    return this.http.delete<Producto>(`/api/Productos/${id}`, {
      headers: this.header,
    });
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
