import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { Compra } from '@models/compras';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ComprasService {
  public header = new HttpHeaders({
    'Content-Type': 'application/json',
    'X-CSRFToken': this.getCookie('csrftoken') || '',
    Authorization: 'Bearer ' + localStorage.getItem('access_token') || '',
  });

  constructor(private http: HttpClient, private cookie: CookieService) {}

  getCompras(): Observable<Compra[]> {
    return this.http.get<Compra[]>('api/compras', { headers: this.header });
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
