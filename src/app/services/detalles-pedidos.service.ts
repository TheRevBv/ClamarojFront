import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DetallePedido } from '@models/detallepedidos';
import { CookieService } from 'ngx-cookie';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DetallesPedidosService {
  public header = new HttpHeaders({
    'Content-Type': 'application/json',
    'X-CSRFToken': this.getCookie('csrftoken') || '',
    Authorization:
      'Bearer ' + localStorage.getItem('access_token_proveedor') ||
      localStorage.getItem('access_token') ||
      localStorage.getItem('access_token_cliente') ||
      '',
  });

  constructor(
    private cookie: CookieService,
    private http: HttpClient,
    private router: Router
  ) {}

  getDetallesPedidos(
    idPedido: number,
    params?: any
  ): Observable<DetallePedido[]> {
    return this.http.get<DetallePedido[]>(`/api/DetallePedidos/${idPedido}`, {
      headers: this.header,
      params: params,
    });
  }

  getDetallePedido(
    idPedido: number,
    idDetallePedido: number
  ): Observable<DetallePedido> {
    return this.http.get<DetallePedido>(
      `/api/DetallePedidos/${idPedido}/${idDetallePedido}`,
      {
        headers: this.header,
      }
    );
  }

  addDetallePedido(
    idPedido: number,
    detallePedido: DetallePedido
  ): Observable<DetallePedido> {
    return this.http.post<DetallePedido>(
      `/api/DetallePedidos/${idPedido}`,
      detallePedido,
      {
        headers: this.header,
      }
    );
  }

  updateDetallePedido(
    idPedido: number,
    detallePedido: DetallePedido
  ): Observable<DetallePedido> {
    return this.http.put<DetallePedido>(
      `/api/DetallePedidos/${idPedido}/${detallePedido.idDetallePedido}`,
      detallePedido,
      {
        headers: this.header,
      }
    );
  }

  deleteDetallePedido(
    idPedido: number,
    idDetallePedido: number
  ): Observable<any> {
    return this.http.delete<any>(
      `/api/DetallePedidos/${idPedido}/${idDetallePedido}`,
      {
        headers: this.header,
      }
    );
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
