import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from '@models/pedidos';
import { CookieService } from 'ngx-cookie';

@Injectable({
  providedIn: 'root',
})
export class PedidosService {
  public header = new HttpHeaders({
    'Content-Type': 'application/json',
    'X-CSRFToken': this.getCookie('csrftoken') || '',
    Authorization: 'Bearer ' + localStorage.getItem('access_token') || '',
  });

  public tiposPedido = [
    { id: 'c', nombre: 'Compra' },
    { id: 'v', nombre: 'Venta' },
  ];

  public tiposPago = [
    { id: 'e', nombre: 'Efectivo' },
    { id: 'tc', nombre: 'Tarjeta de crédito' },
    { id: 'td', nombre: 'Tarjeta de débito' },
    { id: 'tb', nombre: 'Transferencia bancaria' },
  ];

  public tiposEnvio = [
    { id: 'd', nombre: 'A domicilio' },
    { id: 't', nombre: 'Recoger en tienda' },
  ];

  constructor(private http: HttpClient, private cookie: CookieService) {}

  // Get all pedidos
  getPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>('api/pedidos', { headers: this.header });
  }

  // Get pedido
  getPedido(id: number): Observable<Pedido> {
    return this.http.get<Pedido>(`api/pedidos/${id}`, { headers: this.header });
  }

  // Get pedidos by idUsuario
  getPedidosByIdUsuario(idUsuario: number): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`api/pedidos/usuario/${idUsuario}`, {
      headers: this.header,
    });
  }

  // Get pedidos by idStatus
  getPedidosByIdStatus(idStatus: number): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`api/pedidos/status/${idStatus}`, {
      headers: this.header,
    });
  }

  //agregar pedido
  addPedido(pedido: Pedido): Observable<Pedido> {
    return this.http.post<Pedido>('api/pedidos', pedido, {
      headers: this.header,
    });
  }

  //actualizar pedido
  updatePedido(pedido: Pedido): Observable<Pedido> {
    return this.http.put<Pedido>(`api/pedidos/${pedido.idPedido}`, pedido, {
      headers: this.header,
    });
  }

  //eliminar pedido
  deletePedido(id: number): Observable<Pedido> {
    return this.http.delete<Pedido>(`api/pedidos/${id}`, {
      headers: this.header,
    });
  }

  getTipoPedido(): any[] {
    return this.tiposPedido;
  }

  getTipoPago(): any[] {
    return this.tiposPago;
  }

  getTipoEnvio(): any[] {
    return this.tiposEnvio;
  }

  // setCookie(name: string, value: string, days: number) {
  //   let expires = '';
  //   if (days) {
  //     const date = new Date();
  //     date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000); //24 horas
  //     expires = '; expires=' + date.toUTCString();
  //   }
  //   document.cookie = name + '=' + (value || '') + expires + '; path=/';
  // }

  // getCookie(name: string) {
  //   const nameEQ = name + '=';
  //   const ca = document.cookie.split(';');
  //   for (let i = 0; i < ca.length; i++) {
  //     let c = ca[i];
  //     while (c.charAt(0) === ' ') c = c.substring(1, c.length);
  //     if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  //   }
  //   return null;
  // }

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
