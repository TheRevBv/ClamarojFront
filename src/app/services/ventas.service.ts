import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CookieService } from 'ngx-cookie';
import { Observable } from 'rxjs';

import { Venta } from '@models/ventas';

@Injectable({
  providedIn: 'root',
})
export class VentasService {
  public header = new HttpHeaders({
    'Content-Type': 'application/json',
    'X-CSRFToken': this.getCookie('csrftoken') || '',
    Authorization: 'Bearer ' + localStorage.getItem('access_token') || '',
  });

  constructor(private http: HttpClient, private cookie: CookieService) {}

  getVentas(): Observable<Venta[]> {
    return this.http.get<Venta[]>('api/ventas', { headers: this.header });
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
