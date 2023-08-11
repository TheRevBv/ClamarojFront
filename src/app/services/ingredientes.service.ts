import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ingrediente } from '@models/ingrediente';
import { CookieService } from 'ngx-cookie';

@Injectable({
  providedIn: 'root',
})
export class IngredientesService {
  header: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'X-CSRFToken': this.getCookie('csrftoken') || '',
    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
  });

  constructor(private http: HttpClient, private cookie: CookieService) {}

  getIngredientes(): Observable<Ingrediente[]> {
    return this.http.get<Ingrediente[]>('api/ingredientes', {
      headers: this.header,
    });
  }

  getIngredienteByReceta(idReceta: number): Observable<any[]> {
    return this.http.get<any[]>(
      `api/ingredientes/getIngredientesReceta/${idReceta}`,
      {
        headers: this.header,
      }
    );
  }

  deleteIngrediente(idReceta: number, idIngrediente: number): Observable<any> {
    return this.http.delete<Ingrediente>(
      `api/ingredientes/${idReceta}/${idIngrediente}`,
      {
        headers: this.header,
      }
    );
  }

  addIngrediente(ingrediente: Ingrediente): Observable<Ingrediente> {
    return this.http.post<Ingrediente>('api/ingredientes', ingrediente, {
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
